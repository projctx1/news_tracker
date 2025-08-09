import mongoose from 'mongoose';
import express from 'express';

const fs = require('fs').promises;

const pricesRoute = express()

pricesRoute.get('/get/candlesticks', async (req, res) => {
    const { pair } = req.query;

    if (!pair) {
        return res.status(400).json({ error: 'symbol and interval are required' });
    }

    try {
        const filename = `poloniex_parsed_candles_BTC_USDT_MINUTE_30.json`;
        const fileContent = await fs.readFile(filename, 'utf8');
        const candleStickSource = JSON.parse(fileContent);

        console.log(candleStickSource);
        res.status(200).json({ candlestick_data: candleStickSource })
    } catch (error) {
        console.log(error)
    }
});

pricesRoute.get('/get/top/stocks', async (req, res) => {
    try {

    } catch (error) {
        console.log(error)
    }
})


export default pricesRoute;