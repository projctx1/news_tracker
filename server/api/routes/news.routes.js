import mongoose from 'mongoose';
import express from 'express';

const newsRoute = express.Router();
const News = require('../../dist/models/news.model');

// POST - Create a news item
newsRoute.post('/', async (req, res) => {
  try {
    const newsItem = new News(req.body);
    const savedNews = await newsItem.save();
    res.status(201).json(savedNews);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// GET - List news with pagination and filters
newsRoute.get('/', async (req, res) => {
  try {
    const { page = 1, limit = 10, title, source } = req.query;

    let filter = {};
    if (title) filter.title = new RegExp(title, 'i'); 
    if (source) filter.source = new RegExp(source, 'i');

    const newsList = await News.find(filter)
      .skip((page - 1) * limit)
      .limit(parseInt(limit))
      .sort({ published_at: -1 });  

    const total = await News.countDocuments(filter);

    res.json({
      total,
      page: parseInt(page),
      limit: parseInt(limit),
      totalPages: Math.ceil(total / limit),
      data: newsList,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default newsRoute;
