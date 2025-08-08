require('dotenv').config()
const express = require('express');
const app = express();
const port = process.env.PORT;

require('./config/mongoose.config')

app.use(express.json())

import newsRoute from './routes/news.routes.js';
import pricesRoute from './routes/prices.routes.js';
import twitterRoute from './routes/twitter.routes.js';

const { getNews } = require('./services/news.services');
const { getTweets } = require('./services/twitter.services');

//setup cronjobs
getNews();
getTweets();

app.use('/news', newsRoute);
app.use('/prices', pricesRoute);
app.use('/twitter', twitterRoute);


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
  res.json({ message: 'Welcome to the Node server!' });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
