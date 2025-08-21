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

      const refreshRes = await axios.get(`https://graph.facebook.com/v18.0/oauth/access_token`, {
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


/*****************************************************
 * META AUTH
****************************************************
*/
/**
 * Step 1: Redirect to Facebook OAuth
 */
metaRoute.get("/auth", (req, res) => {
  const authUrl = `https://www.facebook.com/v18.0/dialog/oauth?client_id=${META_APP_ID}&redirect_uri=${encodeURIComponent(META_REDIRECT_URI)}&scope=pages_manage_posts,pages_read_engagement,pages_show_list,ads_management,instagram_basic,instagram_content_publish,instagram_manage_comments&response_type=code`;
  res.redirect(authUrl);
});

/**
 * Step 2: Handle OAuth callback
 */
metaRoute.get("/auth/callback", async (req, res) => {
  const { code } = req.query; // no userId in query anymore

  try {
    // Exchange code for short-lived token
    const tokenRes = await axios.get(
      `https://graph.facebook.com/v18.0/oauth/access_token`,
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
    if (!shortLivedToken) {
      throw new Error("No short-lived token returned from Facebook");
    }

    // Exchange short-lived token for long-lived token
    const longTokenRes = await axios.get(
      `https://graph.facebook.com/v18.0/oauth/access_token`,
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
    if (!longLivedToken) {
      throw new Error("No long-lived token returned from Facebook");
    }

    // Calculate expiry date safely
    let expiryDate;
    if (longTokenRes.data.expires_in && !isNaN(longTokenRes.data.expires_in)) {
      expiryDate = new Date(Date.now() + longTokenRes.data.expires_in * 1000);
    } else {
      expiryDate = new Date("9999-12-31");
    }

    // Get Facebook user ID from /me endpoint
    const meRes = await axios.get("https://graph.facebook.com/me", {
      params: {
        access_token: longLivedToken,
        fields: "id,name",
      },
    });

    const metaUserId = meRes.data.id;
    if (!metaUserId) {
      throw new Error("Could not retrieve Facebook user ID from /me");
    }

    // Get user pages
    const pagesRes = await axios.get(
      `https://graph.facebook.com/me/accounts`,
      {
        params: { access_token: longLivedToken },
      }
    );

    const pages = Array.isArray(pagesRes.data.data)
      ? pagesRes.data.data.map((p) => ({
          pageId: p.id,
          pageName: p.name,
          pageAccessToken: p.access_token,
        }))
      : [];

    // Create or update MetaUser in DB using Facebook user ID as unique userId
    const metaUser = await MetaUser.findOneAndUpdate(
      { userId: metaUserId }, // userId is Facebook user ID string
      {
        facebook: {
          userAccessToken: longLivedToken,
          refreshToken: longLivedToken,
          pages,
        },
        tokenExpiry: expiryDate,
      },
      { upsert: true, new: true }
    );

    // Return response
    res.json({ success: true, metaUser });
  } catch (error) {
    console.error("OAuth callback error:", error.response?.data || error.message);
    res.status(500).json({ message: "OAuth callback failed" });
  }
});


/**
 * Connect Instagram account linked to the user's FB page
 * ensure you have connected your facebook page with your instagram page 
 * pass userId in the body parameter when calling this api
 * This api must be called before trying to post
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
      `https://graph.facebook.com/v18.0/${page.pageId}`,
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
      `https://graph.facebook.com/v18.0/${igBusinessAccountId}`,
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

/*****************************************************
 * FACEBOOK ROUTES
****************************************************
*/

/**
 * List Posts on a Facebook Page
 */
metaRoute.get("/facebook/posts", async (req, res) => {
  const { userId, limit = 10, after = null, before = null } = req.query;

  try {
    const metaUser = await MetaUser.findOne({ userId });
    if (!metaUser) throw new Error("Meta user not found");

    const pageToken = metaUser.facebook.pages[0].pageAccessToken;
    const pageId = metaUser.facebook.pages[0].pageId;

    const params = {
      access_token: pageToken,
      fields: "id,message,created_time,permalink_url",
      limit,
    };

    if (after) params.after = after;
    if (before) params.before = before;

    const postsUrl = `https://graph.facebook.com/${pageId}/posts`;
    const postsRes = await axios.get(postsUrl, { params });

    res.json({
      success: true,
      posts: postsRes.data.data,
      paging: postsRes.data.paging || null,
    });
  } catch (error) {
    console.error(error.response?.data || error.message);
    res.status(500).json({ message: "Failed to fetch Facebook posts" });
  }
});


/**
 * Create a Facebook Post
 */
metaRoute.post("/facebook/text/create", getValidToken, async (req, res) => {
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
 * Upload a Video to Facebook Page
 * 
 * Facebook video upload requirements 
    Maximum file size: 100 MB 

    Maximum video length: 20 minutes

    Recommended formats: MP4 or MOV

    Upload method: Simple upload (direct file URL or multipart upload, ≤ 100 MB)

    Required permissions:

        pages_manage_posts

        pages_read_engagement

        Valid Page Access Token
 */
metaRoute.post("/facebook/video/create", getValidToken, async (req, res) => {
  const { userId, videoUrl, title, description } = req.body;

  try {
    const metaUser = await MetaUser.findOne({ userId });
    if (!metaUser) throw new Error("Meta user not found");

    const pageToken = metaUser.facebook.pages[0].pageAccessToken;
    const pageId = metaUser.facebook.pages[0].pageId;

    // Facebook video upload endpoint
    const uploadUrl = `https://graph.facebook.com/${pageId}/videos`;

    // POST request to upload video
    const uploadRes = await axios.post(
      uploadUrl,
      {
        file_url: videoUrl,  
        title: title || "",  
        description: description || "",  
        access_token: pageToken,
      },
      {
        headers: { "Content-Type": "application/json" },
      }
    );

    res.json({ success: true, videoId: uploadRes.data.id });
  } catch (error) {
    console.error(error.response?.data || error.message);
    res.status(500).json({ message: "Failed to upload Facebook video" });
  }
});

/**
 * List comments on a post
 */
metaRoute.get("/facebook/comments/:postId", async (req, res) => {
  const { userId, after, before, limit = 10 } = req.query;
  const { postId } = req.params;

  try {
    const metaUser = await MetaUser.findOne({ userId });
    if (!metaUser) throw new Error("Meta user not found");

    const pageToken = metaUser.facebook.pages[0].pageAccessToken;

    const params = {
      access_token: pageToken,
      fields: "id,message,created_time,from",
      limit,
    };
    if (after) params.after = after;
    if (before) params.before = before;

    const commentsUrl = `https://graph.facebook.com/${postId}/comments`;
    const commentsRes = await axios.get(commentsUrl, { params });

    res.json({
      success: true,
      comments: commentsRes.data.data,
      paging: commentsRes.data.paging || null,
    });
  } 
  catch (error) {
    console.error(error.response?.data || error.message);
    res.status(500).json({ message: "Failed to fetch comments" });
  }
});


/**
 * Create a comment on a post
 */
metaRoute.post("/facebook/comments/:postId", getValidToken, async (req, res) => {
  const { userId, message } = req.body;
  const { postId } = req.params;

  try {
    const metaUser = await MetaUser.findOne({ userId });
    if (!metaUser) throw new Error("Meta user not found");

    const pageToken = metaUser.facebook.pages[0].pageAccessToken;

    const createUrl = `https://graph.facebook.com/${postId}/comments`;
    const createRes = await axios.post(createUrl, {
      message,
      access_token: pageToken,
    });

    res.json({ success: true, commentId: createRes.data.id });
  } catch (error) {
    console.error(error.response?.data || error.message);
    res.status(500).json({ message: "Failed to create comment" });
  }
});

/**
 * Update a comment
 */
metaRoute.put("/facebook/comments/:commentId", getValidToken, async (req, res) => {
  const { userId, message } = req.body;
  const { commentId } = req.params;

  try {
    const metaUser = await MetaUser.findOne({ userId });
    if (!metaUser) throw new Error("Meta user not found");

    const pageToken = metaUser.facebook.pages[0].pageAccessToken;

    const updateUrl = `https://graph.facebook.com/${commentId}`;
    const updateRes = await axios.post(updateUrl, {
      message,
      access_token: pageToken,
    });

    res.json({ success: true, updated: updateRes.data });
  } catch (error) {
    console.error(error.response?.data || error.message);
    res.status(500).json({ message: "Failed to update comment" });
  }
});

/**
 * Delete a comment
 */
metaRoute.delete("/facebook/comments/:commentId", async (req, res) => {
  const { userId } = req.query;
  const { commentId } = req.params;

  try {
    const metaUser = await MetaUser.findOne({ userId });
    if (!metaUser) throw new Error("Meta user not found");

    const pageToken = metaUser.facebook.pages[0].pageAccessToken;

    const deleteUrl = `https://graph.facebook.com/${commentId}`;
    const deleteRes = await axios.delete(deleteUrl, {
      params: { access_token: pageToken },
    });

    res.json({ success: true, deleted: deleteRes.data.success });
  } catch (error) {
    console.error(error.response?.data || error.message);
    res.status(500).json({ message: "Failed to delete comment" });
  }
});



/*****************************************************
 * INSTAGRAM ROUTES
****************************************************
*/

/**
 * Create an Instagram Post
 * 
 * Use a properly sized image that fits Instagram’s requirements:

*  Typical aspect ratios accepted for Instagram feed posts:

        Landscape: 1.91:1

        Square: 1:1

        Portrait: 4:5

        eg use this sample (https://100xinsider.com/uploads/1745193177OPINION_blog_image_1745193177.png)
 */
metaRoute.post("/instagram/image-text/create", getValidToken, async (req, res) => {
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
  } 
  catch (error) {
    console.error(error.response?.data || error.message);
    res.status(500).json({ message: "Failed to create Instagram post" });
  }
});


/**
 * Get instagram posts
 */
metaRoute.get("/instagram/posts", async (req, res) => {
  const { userId, limit = 10, after, before } = req.query;

  try {
    const metaUser = await MetaUser.findOne({ userId });
    if (!metaUser || !metaUser.instagram.igUserId)
      throw new Error("Instagram account not linked");

    const igUserId = metaUser.instagram.igUserId;
    const pageToken = metaUser.facebook.pages[0].pageAccessToken;

    const params = {
      access_token: pageToken,
      fields: "id,caption,media_type,media_url,permalink,timestamp",
      limit,
    };

    if (after) params.after = after;
    if (before) params.before = before;

    const postsRes = await axios.get(`https://graph.facebook.com/${igUserId}/media`, {
      params,
    });

    res.json({
      success: true,
      posts: postsRes.data.data,
      paging: postsRes.data.paging || null,
    });
  } catch (error) {
    console.error(error.response?.data || error.message);
    res.status(500).json({ message: "Failed to fetch Instagram posts" });
  }
});



/**
 * Create instagram video
 * 
 * Instagram Video Upload Requirements (Simple Upload Method)

    Maximum file size: 100 MB, 

    Maximum video length: 60 seconds (for feed videos; longer videos require IGTV or Reels API)

    Recommended formats: MP4 (H.264 codec, AAC audio)

    Square: 1:1 (e.g., 1080×1080)  

    Portrait: between 4:5 (e.g., 1080×1350)

    Landscape: minimum 1.91:1 (e.g., 1080×566)

    Upload method: Simple upload (direct single request, ≤ 100 MB)

    Required permissions:

        instagram_basic

        pages_show_list

        instagram_content_publish

        Valid Instagram Business or Creator account linked to a Facebook Page with a Page Access Token */
metaRoute.post("/instagram/video", getValidToken, async (req, res) => {
  const { userId, caption, videoUrl } = req.body;
  try {
    const metaUser = await MetaUser.findOne({ userId });
    if (!metaUser || !metaUser.instagram.igUserId)
      throw new Error("Instagram account not linked");

    const igUserId = metaUser.instagram.igUserId;
    const pageToken = metaUser.facebook.pages[0].pageAccessToken;

    const mediaRes = await axios.post(`https://graph.facebook.com/${igUserId}/media`, {
      video_url: videoUrl,
      caption,
      access_token: pageToken,
    });

    const publishRes = await axios.post(`https://graph.facebook.com/${igUserId}/media_publish`, {
      creation_id: mediaRes.data.id,
      access_token: pageToken,
    });

    res.json({ success: true, postId: publishRes.data.id });
  } catch (error) {
    console.error(error.response?.data || error.message);
    res.status(500).json({ message: "Failed to upload Instagram video" });
  }
});

/**
 * List comments on a post
 */
metaRoute.get("/instagram/comments/:postId", async (req, res) => {
  const { userId, after, before, limit } = req.query;  
  const { postId } = req.params;

  try {
    const metaUser = await MetaUser.findOne({ userId });
    if (!metaUser || !metaUser.instagram.igUserId) {
      throw new Error("Instagram account not linked");
    }

    const pageToken = metaUser.facebook.pages[0].pageAccessToken;

    // build params dynamically
    const params = {
      fields: "id,text,username,timestamp",
      access_token: pageToken,
    };
    if (after) params.after = after;       
    if (before) params.before = before;    
    if (limit) params.limit = limit;       

    const commentsRes = await axios.get(
      `https://graph.facebook.com/${postId}/comments`,
      { params }
    );

    // Return comments + paging cursors from Facebook
    res.json({
      data: commentsRes.data.data,
      paging: commentsRes.data.paging,
    });

  } catch (error) {
    console.error(error.response?.data || error.message);
    res.status(500).json({ message: "Failed to list Instagram comments" });
  }
});


/**
 * Add comment to a post
 */
metaRoute.post("/instagram/comments/:postId", getValidToken, async (req, res) => {
  const { userId, message } = req.body;
  const { postId } = req.params;

  try {
    const metaUser = await MetaUser.findOne({ userId });
    if (!metaUser || !metaUser.instagram.igUserId)
      throw new Error("Instagram account not linked");

    const pageToken = metaUser.facebook.pages[0].pageAccessToken;

    const commentRes = await axios.post(
      `https://graph.facebook.com/${postId}/comments`,
      { message, access_token: pageToken }
    );

    res.json(commentRes.data);
  } catch (error) {
    console.error(error.response?.data || error.message);
    res.status(500).json({ message: "Failed to add Instagram comment" });
  }
});

/**
 * Delete comment
 */
metaRoute.delete("/instagram/comments/:commentId/:userId", async (req, res) => {
  const { commentId } = req.params;
  const { userId } = req.params;


  try {
    const metaUser = await MetaUser.findOne({ userId });
    if (!metaUser || !metaUser.instagram.igUserId)
      throw new Error("Instagram account not linked");

    const pageToken = metaUser.facebook.pages[0].pageAccessToken;

    const deleteRes = await axios.delete(
      `https://graph.facebook.com/${commentId}`,
      { params: { access_token: pageToken } }
    );

    res.json(deleteRes.data);
  } catch (error) {
    console.error(error.response?.data || error.message);
    res.status(500).json({ message: "Failed to delete Instagram comment" });
  }
});


/*****************************************************
 * META ADVERTS
****************************************************
*/

/*
 * Fetch all ads for a user
 */
metaRoute.get("/ads", async (req, res) => {
  const { userId, after, before, limit } = req.query;  
  const { META_AD_ACCOUNT_ID } = process.env;

  try {
    const metaUser = await MetaUser.findOne({ userId });
    if (!metaUser) {
      return res.status(404).json({ message: "Meta user not found" });
    }

    const accessToken = metaUser.facebook.userAccessToken;

    // Build params dynamically so Facebook handles pagination
    const params = {
      access_token: accessToken,
      fields: "id,name,status,created_time,creative{id,name},adset{id,name},campaign{id,name}",
      limit: limit || 25 
    };
    if (after) params.after = after;
    if (before) params.before = before;

    const adsRes = await axios.get(
      `https://graph.facebook.com/v18.0/${META_AD_ACCOUNT_ID}/ads`,
      { params }
    );

    res.json({
      success: true,
      ads: adsRes.data.data,
      paging: adsRes.data.paging  
    });
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

  try {
    const metaUser = await MetaUser.findOne({ userId });
    if (!metaUser) {
      return res.status(404).json({ message: "Meta user not found" });
    }
    const accessToken = metaUser.facebook.userAccessToken;


    // Step 1: Create Campaign
    const campaignRes = await axios.post(
      `https://graph.facebook.com/v18.0/${META_AD_ACCOUNT_ID}/campaigns`,
      {
        name: campaignName,
        objective: META_DEFAULT_OBJECTIVE,
        status: "PAUSED"
      },
      { params: { access_token: accessToken } }
    );

    // Step 2: Create Ad Set
    const adSetRes = await axios.post(
      `https://graph.facebook.com/v18.0/${META_AD_ACCOUNT_ID}/adsets`,
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
      `https://graph.facebook.com/v18.0/${META_AD_ACCOUNT_ID}/adcreatives`,
      {
        name: adName,
        object_story_spec: adCreative
      },
      { params: { access_token: accessToken } }
    );

    // Step 4: Create Ad
    const adRes = await axios.post(
      `https://graph.facebook.com/v18.0/${META_AD_ACCOUNT_ID}/ads`,
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
     if (!metaUser) {
      return res.status(404).json({ message: "Meta user not found" });
    }
    const accessToken = metaUser.facebook.userAccessToken;

    const updateRes = await axios.post(
      `https://graph.facebook.com/v18.0/${adId}`,
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
metaRoute.delete("/ads/:adId", getValidToken, async (req, res) => {
  const { userId } = req.body;
  const { adId } = req.params;

  try {
     if (!metaUser) {
      return res.status(404).json({ message: "Meta user not found" });
    }
    const accessToken = metaUser.facebook.userAccessToken;
    const deleteRes = await axios.delete(
      `https://graph.facebook.com/v18.0/${adId}`,
      { params: { access_token: accessToken } }
    );

    res.json({ success: true, deleted: deleteRes.data });
  } catch (error) {
    console.error("Delete Ad error:", error.response?.data || error.message);
    res.status(500).json({ message: "Failed to delete ad" });
  }
});

export default metaRoute;
