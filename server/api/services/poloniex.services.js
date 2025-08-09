const fs = require('fs').promises;

import PoloniexParser from '../utils/PoloniexParser';

const poloniexApiUrl = 'https://api.poloniex.com';

async function getCryptoMarketPairsFromPoloniex() {
    const apiUrl = `${poloniexApiUrl}/markets`;
    const filename = 'poloniex_market_pairs.json';

    try {
        console.log('Fetching crypto market pairs from Poloniex API...');

        const response = await fetch(apiUrl);

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();

        console.log('Successfully fetched market pairs. Saving to file...');

        const jsonData = JSON.stringify(data, null, 2);
        await fs.writeFile(filename, jsonData, 'utf8');

        console.log(`Data successfully saved to ${filename}`);

        return data;

    } catch (error) {
        console.error('An error occurred while fetching market pairs:', error);
        return [];
    }
}

/**
 * Fetches the latest market prices for all pairs from the Poloniex API.
 * @returns {Array} An array of market prices.
 */

async function getCryptoMarketPricesFromPoloniex() {
    const apiUrl = `${poloniexApiUrl}/markets/price`;
    const filename = 'poloniex_market_prices.json';

    try {
        console.log('Fetching crypto market prices from Poloniex API...');

        const response = await fetch(apiUrl);

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();

        console.log('Successfully fetched market prices. Saving to file...');

        const jsonData = JSON.stringify(data, null, 2);
        await fs.writeFile(filename, jsonData, 'utf8');

        console.log(`Data successfully saved to ${filename}`);

        return data;

    } catch (error) {
        console.error('An error occurred while fetching market prices:', error);
        return [];
    }
}

/**
 * Fetches historical candlestick data (OHLCV) for a specific trading pair.
 * @param {string} symbol The trading pair symbol, e.g., 'BTC_USDT'.
 * @param {string} interval The time interval for the candles (e.g., 'MINUTE_5', 'HOUR_1').
 * @param {number} [limit=100] The maximum number of records to return. Max is 500.
 * @returns {Array} An array of candlestick data.
 */

async function getCandlestickDataFromPoloniex(symbol, interval, limit = 100) {
    const apiUrl = `${poloniexApiUrl}/markets/${symbol}/candles?interval=${interval}&limit=${limit}`;
    const filename = `poloniex_candles_${symbol}_${interval}.json`;

    try {
        console.log(`Fetching candlestick data for ${symbol} with interval ${interval}...`);

        const response = await fetch(apiUrl);

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();

        console.log('Successfully fetched candlestick data. Saving to file...');

        const jsonData = JSON.stringify(data, null, 2);
        await fs.writeFile(filename, jsonData, 'utf8');

        console.log(`Data successfully saved to ${filename}`);

        return data;
    } catch (error) {
        console.error('An error occurred while fetching candlestick data:', error);
        return [];
    }
}

/**
 * Fetches the order book for a specific trading pair.
 * @param {string} symbol The trading pair symbol, e.g., 'BTC_USDT'.
 * @param {number} [limit=10] The maximum number of records to return. Valid values are 5, 10, 20, 50, 100, 150.
 * @returns {Object} An object containing bids and asks.
 */

async function getOrderBookFromPoloniex(symbol, limit = 10) {
    const apiUrl = `${poloniexApiUrl}/markets/${symbol}/orderBook?limit=${limit}`;
    const filename = `poloniex_orderbook_${symbol}.json`;

    try {
        console.log(`Fetching order book for ${symbol}...`);

        const response = await fetch(apiUrl);

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();

        console.log('Successfully fetched order book. Saving to file...');

        const jsonData = JSON.stringify(data, null, 2);
        await fs.writeFile(filename, jsonData, 'utf8');

        console.log(`Data successfully saved to ${filename}`);

        return data;
    } catch (error) {
        console.error('An error occurred while fetching order book:', error);
        return null;
    }
}

async function savePoloniexCandlesForPair({ symbol, interval }) {
    let filename = `poloniex_candles_${symbol}_${interval}.json`;
    let candleData = [];

    try {
        const fileContent = await fs.readFile(filename, 'utf8');
        candleData = JSON.parse(fileContent);

        const parsedCandles = PoloniexParser.parseCandles(candleData);

        //console.log(parsedCandles, 'parsedCandles');

        filename = `poloniex_parsed_candles_${symbol}_${interval}.json`; 

        await fs.writeFile(filename, JSON.stringify(parsedCandles, null, 2), 'utf8');
        console.log(`Saved parsed candles to ${filename}`);
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    getCryptoMarketPairsFromPoloniex,
    getCryptoMarketPricesFromPoloniex,
    getCandlestickDataFromPoloniex,
    savePoloniexCandlesForPair,
    getOrderBookFromPoloniex
}