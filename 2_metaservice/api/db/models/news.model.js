// news.model.js
const mongoose = require('mongoose');

const newsSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  image_url: String,
  url: String,
  source: String,
  published_at: Date,
}, { timestamps: true });

const News = mongoose.models.News || mongoose.model('News', newsSchema);

module.exports = News;
