require("dotenv").config();
import express from "express";
import axios from "axios";
import MetaUser from "../models/meta_user.model.js";

const { META_APP_ID, META_APP_SECRET, META_REDIRECT_URI } = process.env;
const metaRoute = express.Router();


/**
 * Middleware to ensure a valid Meta (Facebook/Instagram) token.
 * - Refreshes if expired.
 * - Attaches `req.metaUser` and `req.accessToken`.
 */
async function getValidToken(req, res, next) {
  const { userId } = req.body; 

  if (!userId) {
    return res.status(400).json({ message: "Missing userId" });
  }

  try {
    const metaUser = await MetaUser.findOne({ userId });
    if (!metaUser) {
      return res.status(404).json({ message: "Meta user not found" });
    }

    const now = new Date();
    let token = metaUser.facebook.userAccessToken;

    // If token expired or will expire in next 5 mins, refresh
    if (!metaUser.tokenExpiry || metaUser.tokenExpiry <= new Date(now.getTime() + 5 * 60 * 1000)) {
      console.log(`Refreshing token for user ${userId}...`);

      const refreshRes = await axios.get(`https://graph.facebook.com/v21.0/oauth/access_token`, {
        params: {
          grant_type: "fb_exchange_token",
          client_id: META_APP_ID,
          client_secret: META_APP_SECRET,
          fb_exchange_token: metaUser.facebook.refreshToken || token
        }
      });

      token = refreshRes.data.access_token;
      const expiresIn = refreshRes.data.expires_in;
      const newExpiryDate = new Date(now.getTime() + expiresIn * 1000);

      // Save refreshed token
      metaUser.facebook.userAccessToken = token;
      metaUser.facebook.refreshToken = token;
      metaUser.tokenExpiry = newExpiryDate;
      await metaUser.save();

      console.log(`Token refreshed. Expires at ${newExpiryDate.toISOString()}`);
    }

    // Attach to request for use in controllers
    req.metaUser = metaUser;
    req.accessToken = token;

    next();
  } 
  catch (error) {
    console.error("Token middleware error:", error.response?.data || error.message);
    return res.status(500).json({ message: "Failed to validate Meta token" });
  }
}

/**
 * Step 1: Redirect to Facebook OAuth
 */
metaRoute.get("/auth", (req, res) => {
  const authUrl = `https://www.facebook.com/v21.0/dialog/oauth?client_id=${META_APP_ID}&redirect_uri=${encodeURIComponent(META_REDIRECT_URI)}&scope=pages_manage_posts,pages_read_engagement,pages_show_list,ads_management,instagram_basic,instagram_content_publish&response_type=code`;
  res.redirect(authUrl);
});

/**
 * Step 2: Handle OAuth callback
 */
metaRoute.get("/auth/callback", async (req, res) => {
  const { code, userId } = req.query; 

  try {
    // Exchange code for short-lived token
    const tokenRes = await axios.get(
      `https://graph.facebook.com/v21.0/oauth/access_token`,
      {
        params: {
          client_id: META_APP_ID,
          client_secret: META_APP_SECRET,
          redirect_uri: META_REDIRECT_URI,
          code,
        },
      }
    );

    const shortLivedToken = tokenRes.data.access_token;

    // Exchange short-lived token for long-lived token
    const longTokenRes = await axios.get(
      `https://graph.facebook.com/v21.0/oauth/access_token`,
      {
        params: {
          grant_type: "fb_exchange_token",
          client_id: META_APP_ID,
          client_secret: META_APP_SECRET,
          fb_exchange_token: shortLivedToken,
        },
      }
    );

    const longLivedToken = longTokenRes.data.access_token;
    const expiryDate = new Date(Date.now() + longTokenRes.data.expires_in * 1000);

    // Get user pages
    const pagesRes = await axios.get(
      `https://graph.facebook.com/me/accounts?access_token=${longLivedToken}`
    );

    // Create or update MetaUser
    const metaUser = await MetaUser.findOneAndUpdate(
      { userId },
      {
        facebook: {
          userAccessToken: longLivedToken,
          refreshToken: longLivedToken,
          pages: pagesRes.data.data.map((p) => ({
            pageId: p.id,
            pageName: p.name,
            pageAccessToken: p.access_token,
          })),
        },
        tokenExpiry: expiryDate,
      },
      { upsert: true, new: true }
    );

    res.json({ success: true, metaUser });
  } catch (error) {
    console.error(error.response?.data || error.message);
    res.status(500).json({ message: "OAuth callback failed" });
  }
});

/**
 * Connect Instagram account linked to the user's FB page
 * ensure you have connected your facebook page with your instagram page 
 * pass userId in the body parameter when calling this api
 */
metaRoute.post("/connect-instagram-page", async (req, res) => {
  const { userId } = req.body;

  try {
    const metaUser = await MetaUser.findOne({ userId });
    if (!metaUser) {
      return res.status(404).json({ message: "Meta user not found" });
    }

    if (!metaUser.facebook?.pages?.length) {
      return res.status(400).json({ message: "No Facebook pages found for this user" });
    }

    // Use the first page (or let user pick)
    const page = metaUser.facebook.pages[0];

    // Step 1: Get Instagram Business Account ID linked to this FB page
    const igRes = await axios.get(
      `https://graph.facebook.com/v21.0/${page.pageId}`,
      {
        params: {
          fields: "instagram_business_account",
          access_token: page.pageAccessToken,
        },
      }
    );

    const igBusinessAccountId = igRes.data.instagram_business_account?.id;
    if (!igBusinessAccountId) {
      return res.status(400).json({ message: "No Instagram business account linked to this FB page" });
    }

    // Step 2: Get Instagram username & details
    const igDetailsRes = await axios.get(
      `https://graph.facebook.com/v21.0/${igBusinessAccountId}`,
      {
        params: {
          fields: "username",
          access_token: page.pageAccessToken,
        },
      }
    );

    // Step 3: Update MetaUser with Instagram data
    metaUser.instagram = {
      igUserId: igBusinessAccountId,
      username: igDetailsRes.data.username,
    };
    await metaUser.save();

    res.json({
      success: true,
      message: "Instagram connected successfully",
      instagram: metaUser.instagram,
    });
  } catch (error) {
    console.error(error.response?.data || error.message);
    res.status(500).json({ message: "Failed to connect Instagram" });
  }
});

/**
 * Create a Facebook Post
 */
metaRoute.post("/facebook", getValidToken, async (req, res) => {
  const { userId, message, link } = req.body;

  try {
    const metaUser = await MetaUser.findOne({ userId });
    if (!metaUser) throw new Error("Meta user not found");

    const pageToken = metaUser.facebook.pages[0].pageAccessToken;
    const pageId = metaUser.facebook.pages[0].pageId;

    const postUrl = `https://graph.facebook.com/${pageId}/feed`;
    const postRes = await axios.post(postUrl, {
      message,
      link,
      access_token: pageToken,
    });

    res.json({ success: true, postId: postRes.data.id });
  } catch (error) {
    console.error(error.response?.data || error.message);
    res.status(500).json({ message: "Failed to create Facebook post" });
  }
});

/**
 * Create an Instagram Post
 */
metaRoute.post("/instagram", getValidToken, async (req, res) => {
  const { userId, caption, imageUrl } = req.body;

  try {
    const metaUser = await MetaUser.findOne({ userId });
    if (!metaUser || !metaUser.instagram.igUserId)
      throw new Error("Instagram account not linked");

    const igUserId = metaUser.instagram.igUserId;
    const pageToken = metaUser.facebook.pages[0].pageAccessToken;

    // Step 1: Create media container
    const mediaRes = await axios.post(
      `https://graph.facebook.com/${igUserId}/media`,
      {
        image_url: imageUrl,
        caption,
        access_token: pageToken,
      }
    );

    // Step 2: Publish
    const publishRes = await axios.post(
      `https://graph.facebook.com/${igUserId}/media_publish`,
      {
        creation_id: mediaRes.data.id,
        access_token: pageToken,
      }
    );

    res.json({ success: true, postId: publishRes.data.id });
  } catch (error) {
    console.error(error.response?.data || error.message);
    res.status(500).json({ message: "Failed to create Instagram post" });
  }
});

/**
 * Fetch all ads for a user
 */
metaRoute.get("/ads", getValidToken,  async (req, res) => {
  const { userId } = req.query;
  const { META_AD_ACCOUNT_ID } = process.env;

  try {
    const accessToken = await getValidToken(userId);
    const adsRes = await axios.get(
      `https://graph.facebook.com/v21.0/${META_AD_ACCOUNT_ID}/ads`,
      {
        params: {
          access_token: accessToken,
          fields: "id,name,status,created_time,creative{id,name},adset{id,name},campaign{id,name}"
        }
      }
    );

    res.json({ success: true, ads: adsRes.data.data });
  } catch (error) {
    console.error("Fetch Ads error:", error.response?.data || error.message);
    res.status(500).json({ message: "Failed to fetch ads" });
  }
});

/**
 * Create an Advert (Facebook & Instagram)
 */
metaRoute.post("/advert", getValidToken, async (req, res) => {
  const { userId, adName, adCreative, campaignName, dailyBudget } = req.body;
  const { META_AD_ACCOUNT_ID, META_DEFAULT_OBJECTIVE, META_CURRENCY } = process.env;

  try
   {
    const metaUser = await MetaUser.findOne({ userId });
    if (!metaUser) {
      return res.status(404).json({ message: "Meta user not found" });
    }

    // Step 0: Get valid token
    const accessToken = await getValidToken(userId);

    // Step 1: Create Campaign
    const campaignRes = await axios.post(
      `https://graph.facebook.com/v21.0/${META_AD_ACCOUNT_ID}/campaigns`,
      {
        name: campaignName,
        objective: META_DEFAULT_OBJECTIVE,
        status: "PAUSED"
      },
      { params: { access_token: accessToken } }
    );

    // Step 2: Create Ad Set
    const adSetRes = await axios.post(
      `https://graph.facebook.com/v21.0/${META_AD_ACCOUNT_ID}/adsets`,
      {
        name: `${campaignName} AdSet`,
        daily_budget: dailyBudget, 
        billing_event: "IMPRESSIONS",
        optimization_goal: "REACH",
        campaign_id: campaignRes.data.id,
        targeting: { geo_locations: { countries: ["US"] } },
        status: "PAUSED",
        currency: META_CURRENCY
      },
      { params: { access_token: accessToken } }
    );

    // Step 3: Create Ad Creative
    const creativeRes = await axios.post(
      `https://graph.facebook.com/v21.0/${META_AD_ACCOUNT_ID}/adcreatives`,
      {
        name: adName,
        object_story_spec: adCreative
      },
      { params: { access_token: accessToken } }
    );

    // Step 4: Create Ad
    const adRes = await axios.post(
      `https://graph.facebook.com/v21.0/${META_AD_ACCOUNT_ID}/ads`,
      {
        name: adName,
        adset_id: adSetRes.data.id,
        creative: { creative_id: creativeRes.data.id },
        status: "PAUSED"
      },
      { params: { access_token: accessToken } }
    );

    res.json({
      success: true,
      campaignId: campaignRes.data.id,
      adSetId: adSetRes.data.id,
      creativeId: creativeRes.data.id,
      adId: adRes.data.id
    });

  } catch (error) {
    console.error("Ad creation error:", error.response?.data || error.message);
    res.status(500).json({ message: "Failed to create advert" });
  }
});

/**
 * Update an existing ad
 */
metaRoute.put("/ads/:adId", getValidToken, async (req, res) => {
  const { userId, name, status } = req.body;
  const { adId } = req.params;

  try {
    const accessToken = await getValidToken(userId);

    const updateRes = await axios.post(
      `https://graph.facebook.com/v21.0/${adId}`,
      {
        ...(name && { name }),
        ...(status && { status })
      },
      { params: { access_token: accessToken } }
    );

    res.json({ success: true, updated: updateRes.data });
  } catch (error) {
    console.error("Update Ad error:", error.response?.data || error.message);
    res.status(500).json({ message: "Failed to update ad" });
  }
});

/**
 * Delete an ad
 */
metaRoute.delete("/ads/:adId", async (req, res) => {
  const { userId } = req.body;
  const { adId } = req.params;

  try {
    const accessToken = await getValidToken(userId);

    const deleteRes = await axios.delete(
      `https://graph.facebook.com/v21.0/${adId}`,
      { params: { access_token: accessToken } }
    );

    res.json({ success: true, deleted: deleteRes.data });
  } catch (error) {
    console.error("Delete Ad error:", error.response?.data || error.message);
    res.status(500).json({ message: "Failed to delete ad" });
  }
});

export default metaRoute;
