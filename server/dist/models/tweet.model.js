"use strict";

// models/Tweet.js
var mongoose = require('mongoose');
var tweetSchema = new mongoose.Schema({
  TweetId: {
    type: String,
    required: true,
    unique: true
  },
  Text: String,
  AuthorId: String,
  TweetedAt: String,
  AuthorUsername: String,
  AuthorName: String,
  AuthorProfileImageUrl: String,
  RetweetCount: Number,
  ReplyCount: Number,
  LikeCount: Number,
  QuoteCount: Number
}, {
  timestamps: true
});
module.exports = mongoose.model('Tweet', tweetSchema);