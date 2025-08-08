require('dotenv').config();
const mongoose = require('../config/mongoose.config');
const axios = require('axios');

const TargetAccount = require('../models/target_account.model');
const Tweet = require('../models/tweet.model');

async function getTweets() 
{ 
    console.log("Fetching tweets...");

    try 
    {
        const targets = await TargetAccount.find({});

        for (const item of targets) {
            const query = `(from:${item.author_username})`;
            const url = `https://api.twitter.com/2/tweets/search/recent` +
            `?query=${encodeURIComponent(query)}` +
            `&tweet.fields=created_at,author_id,text,public_metrics` +
            `&expansions=author_id` +
            `&user.fields=username,name,profile_image_url` +
            `&max_results=100`;

            const response = await axios.get(url, {
            headers: {
                "Authorization": `Bearer ${process.env.TWITTER_BEARER_TOKEN}`
            }
            });

            const data = response.data;
            const tweets = data?.data || [];
            const users = data?.includes?.users || [];

            if (tweets.length > 0) {
            for (const tweetModel of tweets) {
                const user = users.find(u => u.id === tweetModel.author_id);

                const exists = await Tweet.exists({ TweetId: tweetModel.id });
                if (!exists) {
                await Tweet.create({
                    TweetId: tweetModel.id,
                    Text: tweetModel.text,
                    AuthorId: tweetModel.author_id,
                    TweetedAt: tweetModel.created_at,
                    AuthorUsername: user?.username,
                    AuthorName: user?.name,
                    AuthorProfileImageUrl: user?.profile_image_url,
                    RetweetCount: tweetModel.public_metrics?.retweet_count || 0,
                    ReplyCount: tweetModel.public_metrics?.reply_count || 0,
                    LikeCount: tweetModel.public_metrics?.like_count || 0,
                    QuoteCount: tweetModel.public_metrics?.quote_count || 0
                });
                }
            }

            console.log(" Tweets saved with author info and metrics.");
            }

            // Wait 32 minutes between target accounts
            await new Promise(resolve => setTimeout(resolve, 10 * 60 * 1000));
        }
    } 
    catch (error) 
    {
     console.error(" Error fetching tweets:", error.message);
    }
}

module.exports  = {
    getTweets
}