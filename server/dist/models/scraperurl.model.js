"use strict";

var mongoose = require('mongoose');
var ScraperURLSchema = new mongoose.Schema({
  url: {
    type: String,
    required: [true, 'url is required'],
    unique: true,
    trim: true
  },
  urlname: {
    type: String,
    required: [true, 'urlname is required'],
    unique: true,
    trim: true
  },
  urlapex: {
    type: String,
    trim: true
  },
  lastScraped: {
    type: Date,
    "default": Date.now
  },
  previousScraped: {
    type: Date
  },
  timesScraped: {
    type: Number,
    "default": 0
  },
  failedAttempts: {
    type: Number,
    "default": 0
  },
  errors: {
    type: [String],
    "default": []
  }
}, {
  timestamps: true
});
var ScraperURL = mongoose.model('ScraperURL', ScraperURLSchema);
module.exports = ScraperURL;

/*
// Assuming a failed scrape
const urlId = 'your-document-id';
const errorMessage = 'Failed to connect to the URL.';

await ScraperURL.findByIdAndUpdate(
    urlId,
    {
        $inc: { failedAttempts: 1 },
        $push: { errors: errorMessage }
    },
    { new: true }
);

// Assuming a failed scrape
const urlId = 'your-document-id';
const errorMessage = 'Failed to connect to the URL.';

await ScraperURL.findByIdAndUpdate(
    urlId,
    {
        $inc: { failedAttempts: 1 },
        $push: { errors: errorMessage }
    },
    { new: true }
);*/