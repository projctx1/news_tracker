require('dotenv').config()
const express = require('express');
const app = express();
const port = process.env.PORT;

require('./config/mongoose.config');

app.use(express.json());

import newsRoute from './routes/news.routes.js';
import pricesRoute from './routes/prices.routes.js';
import twitterRoute from './routes/twitter.routes.js';
import metaRoute from './routes/meta.routes.js';

const { getNews } = require('./services/news.services');
const { getTweets } = require('./services/twitter.services');

const {
  getCryptoMarketPairsFromPoloniex,
  getCryptoMarketPricesFromPoloniex,
  getCandlestickDataFromPoloniex,
  savePoloniexCandlesForPair,
  getOrderBookFromPoloniex
} = require('./services/poloniex.services.js');

const {
  updateBiggestCompaniesStock
} = require('./services/stocks.services.js');

const {
  runScrapper
} = require('./services/scraper.services.js');



//setup cronjobs
//getNews();
//getTweets();

//setInterval(getNews, 3600000);      // every hour
//setInterval(getTweets, 3600000);    // every hour

app.use('/api/news', newsRoute);
app.use('/api/prices', pricesRoute);
app.use('/api/twitter', twitterRoute);
app.use('/api/meta', metaRoute);

const symbol = 'BTC_USDT';
const interval = 'MINUTE_30';
const limit = `149`;

const now = new Date().getTime();
const oneDayAgo = now - 24 * 60 * 60 * 1000;
const startTime = oneDayAgo;
const endTime = now;

//getCandlestickDataFromPoloniex(symbol, interval, limit, startTime, endTime);
//getOrderBookFromPoloniex(symbol)
//getCryptoMarketPairsFromPoloniex();
//getCryptoMarketPricesFromPoloniex();
/*savePoloniexCandlesForPair({
  symbol: 'BTC_USDT', 
  interval: 'MINUTE_30',
})*/

//updateBiggestCompaniesStock();
//scrapAndSaveToDb({ url: 'https://www.coingecko.com/en/news/load_more?page=5' });

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
