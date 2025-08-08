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

//  fetch all scraped tweet with pagination & optional filters
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

// Create Tweet for a specific TwitterUser
// This route do not return json response, instead it redirect the user to the twitter login
twitterRoute.get('/auth', async (req, res) => {
  const { url, codeVerifier, state } = twitterClient.generateOAuth2AuthLink(
    process.env.TWITTER_CALLBACK_URL,
    { scope: ['tweet.read', 'tweet.write', 'users.read', 'offline.access'] }
  );

  // Save verifier & state in session or temp store
  req.session = { codeVerifier, state };
  res.redirect(url);
});

//Callback from Twitter
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

// Create a Twitter User (store account creds)
twitterRoute.post('/users', async (req, res) => {
  try {
    const { username, accountId, bearerToken, accessToken, accessSecret } = req.body;

    const user = await TwitterUser.create({ username, accountId, bearerToken, accessToken, accessSecret });
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all Twitter Users
twitterRoute.get('/users', async (req, res) => {
  const users = await TwitterUser.find();
  res.json(users);
});

// Update Twitter User
twitterRoute.put('/users/:id', async (req, res) => {
  try {
    const updated = await TwitterUser.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete Twitter User
twitterRoute.delete('/users/:id', async (req, res) => {
  try {
    await TwitterUser.findByIdAndDelete(req.params.id);
    res.json({ message: 'Twitter user deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all target accounts
twitterRoute.get('/targets', async (req, res) => {
    try {
        const accounts = await TargetAccount.find();
        res.json(accounts);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Create target account
twitterRoute.post('/targets', async (req, res) => {
    try {
        const account = new TargetAccount(req.body);
        await account.save();
        res.status(201).json(account);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Update target account
twitterRoute.put('/targets/:id', async (req, res) => {
    try {
        const account = await TargetAccount.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!account) return res.status(404).json({ error: 'Target account not found' });
        res.json(account);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Delete target account
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