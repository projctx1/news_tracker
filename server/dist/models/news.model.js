"use strict";

// news.model.js
var mongoose = require('mongoose');
var newsSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: String,
  image_url: String,
  url: String,
  source: String,
  published_at: Date
}, {
  timestamps: true
});
var News = mongoose.models.News || mongoose.model('News', newsSchema);
module.exports = News;