require('dotenv').config()
const express = require('express');
const app = express();
const port = process.env.PORT;

require('./config/mongoose.config');

app.use(express.json());

import { runScrapper } from './utils/scrapeUrl';

//runScrapper();

app.get('/health', async (req, res, next) => {
  try {
    console.log('✅ GET /health hit')
    res.status(200).json({
      message: 'server is up and running here now'
    })
  } catch (error) {
    next(error)
  }
})

app.get('/', (req, res) => {
  res.json({ message: 'Welcome to the Node scrapper service!' });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
