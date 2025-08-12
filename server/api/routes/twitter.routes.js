require('dotenv').config();
import express from 'express';
import mongoose from 'mongoose';
import Tweet from '../models/tweet.model.js';
import TargetAccount from '../models/target_account.model.js';
import TwitterUser from '../models/twitter_user.model.js';
import TwitterApi  from 'twitter-api-v2';

const twitterClient = new TwitterApi({
  clientId: process.env.TWITTER_CLIENT_ID,
  clientSecret: process.env.TWITTER_CLIENT_SECRET
});
 
const twitterRoute = express.Router();

/**
 * 
 * Warp with user credentials for posting
 */
async function getUserTwitterClient(userId) {
  const twitterUser = await TwitterUser.findById(userId);
  if (!twitterUser) throw new Error('Twitter user not found');

  // Return a client with the user's tokens embedded
  return twitterClient.loginWithAccessToken({
    accessToken: twitterUser.accessToken,
    accessSecret: twitterUser.accessSecret,
  });
}

/**
 * Create Tweet for a specific TwitterUser
 *  This route do not return json response, instead it redirect the user to the twitter login
 * 
 */
twitterRoute.get('/auth', async (req, res) => {
  const { url, codeVerifier, state } = twitterClient.generateOAuth2AuthLink(
    process.env.TWITTER_CALLBACK_URL,
    { scope: ['tweet.read', 'tweet.write', 'users.read', 'offline.access'] }
  );

  // Save verifier & state in session or temp store
  req.session.codeVerifier = codeVerifier;
  req.session.state = state;

  await req.session.save();

  res.redirect(url);
});

/**
 * Callback from Twitter
 * 
 */
twitterRoute.get('/callback', async (req, res) => {
  const { state, code } = req.query;

  if (!state || !code || state !== req.session.state) {
    return res.status(400).send("Invalid state or code");
  }

  try {
    const { client: loggedClient, accessToken, refreshToken } =
      await twitterClient.loginWithOAuth2({
        code,
        codeVerifier: req.session.codeVerifier,
        redirectUri: process.env.TWITTER_CALLBACK_URL,
      });

    const me = await loggedClient.v2.me();

    // 1 Check if user already exists
    let existingUser = await TwitterUser.findOne({ accountId: me.data.id });

    if (!existingUser) {
      // 2 Create Twitter user in DB
      existingUser = await TwitterUser.create({
        username: me.data.username,
        accountId: me.data.id,
        accessToken,
        accessSecret: refreshToken || ''
      });

      // 3 Add to TargetAccount if not already there
      const existingTarget = await TargetAccount.findOne({ author_username: me.data.username });
      if (!existingTarget) {
        await TargetAccount.create({ author_username: me.data.username });
      }
    }

    res.send("Twitter account connected!");
  } 
  catch (error) 
  {
    console.error(error);
    res.status(500).send("Authentication failed");
  }
  
});

/**
 * 
 * fetch all scraped tweet with pagination & optional filters
 */
twitterRoute.get('/target-tweets', async (req, res) => {
    try {
        // Query params for pagination
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
 
        // Optional filters (example: by author or keyword)
        const filters = {};
        if (req.query.author) {
            filters.author = req.query.author;
        }
        if (req.query.keyword) {
            filters.text = { $regex: req.query.keyword, $options: 'i' };
        }

        // Fetch tweets
        const tweets = await Tweet.find(filters)
            .sort({ createdAt: -1 })  
            .skip((page - 1) * limit)
            .limit(limit);

        // Count for pagination
        const total = await Tweet.countDocuments(filters);

        res.json({
            page,
            limit,
            totalPages: Math.ceil(total / limit),
            totalRecords: total,
            data: tweets
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error fetching tweets' });
    }
});

/**
 * Create a tweet
 * 
 */
twitterRoute.post('/post', async (req, res) => {
  const { userId, text } = req.body;
  try {
    const client = await getUserTwitterClient(userId);
    const tweet = await client.v2.tweet(text);
    res.json({ success: true, tweet });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to create tweet' });
  }
});


/**
 * Get recent tweets posted by user on twitter
 * 
 */
twitterRoute.get('/posts', async (req, res) => {
  const { userId, max_results = 10, pagination_token } = req.query;
  try {
    const twitterUser = await TwitterUser.findById(userId);
    if (!twitterUser) return res.status(404).json({ message: 'Twitter user not found' });

    const client = await getUserTwitterClient(userId);

    // Get user id from stored accountId
    const userIdTwitter = twitterUser.accountId;

    const tweets = await client.v2.userTimeline(userIdTwitter, {
      max_results,
      pagination_token,
      expansions: ['author_id'],
      'tweet.fields': ['created_at', 'public_metrics'],
    });

    res.json({
      success: true,
      tweets: tweets.data,
      meta: tweets.meta,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to fetch tweets' });
  }
});

/**
 * 
 * Create a reply (comment)
 */
twitterRoute.post('/comments', async (req, res) => {
  const { userId, text, in_reply_to_tweet_id } = req.body;
  try {
    const client = await getUserTwitterClient(userId);
    const reply = await client.v2.tweet(text, {
      reply: { in_reply_to_tweet_id },
    });
    res.json({ success: true, reply });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to create reply' });
  }
});

/**
 * Delete a tweet
 */
twitterRoute.delete('/post/:tweetId', async (req, res) => {
  const { userId } = req.query
  const { tweetId } = req.params;
  try {
    const client = await getUserTwitterClient(userId);
    await client.v2.deleteTweet(tweetId);
    res.json({ success: true, message: 'Tweet deleted' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to delete tweet' });
  }
});

/**
 * 
 * Update a comment/tweet (delete + repost)
 */
twitterRoute.put('/comments/:tweetId', async (req, res) => {
  const { userId, text } = req.body;
  const { tweetId } = req.params;
  try {
    const client = await getUserTwitterClient(userId);
    await client.v2.deleteTweet(tweetId);
    const newTweet = await client.v2.tweet(text);
    res.json({ success: true, tweet: newTweet });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to update tweet' });
  }
});


/**
 * 
 * Create a Twitter User (store account creds) in db
 */
twitterRoute.post('/users', async (req, res) => {
  try {
    const { username, accountId, bearerToken, accessToken, accessSecret } = req.body;

    const user = await TwitterUser.create({ username, accountId, bearerToken, accessToken, accessSecret });
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * 
 *  Get all Twitter Users in db
 */
twitterRoute.get('/users', async (req, res) => {
  const users = await TwitterUser.find();
  res.json(users);
});

/**
 * 
 * Update Twitter User in db
 */
twitterRoute.put('/users/:id', async (req, res) => {
  try {
    const updated = await TwitterUser.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * 
 * Delete Twitter User in db
 */
twitterRoute.delete('/users/:id', async (req, res) => {
  try {
    await TwitterUser.findByIdAndDelete(req.params.id);
    res.json({ message: 'Twitter user deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * Get all target accounts in db
 * 
 */
twitterRoute.get('/targets', async (req, res) => {
    try {
        const accounts = await TargetAccount.find();
        res.json(accounts);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
/**
 * 
 * Create target account in db
 */
twitterRoute.post('/targets', async (req, res) => {
    try {
        const account = new TargetAccount(req.body);
        await account.save();
        res.status(201).json(account);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

/**
 * Update target account in db
 */
twitterRoute.put('/targets/:id', async (req, res) => {
    try {
        const account = await TargetAccount.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!account) return res.status(404).json({ error: 'Target account not found' });
        res.json(account);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

/***
 * Delete target account in db
 */
twitterRoute.delete('/targets/:id', async (req, res) => {
    try {
        const account = await TargetAccount.findByIdAndDelete(req.params.id);
        if (!account) return res.status(404).json({ error: 'Target account not found' });
        res.json({ message: 'Target account deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

export default twitterRoute;