class PoloniexParser {
    static parseCandle(entry) {
        return {
            // order per docs:
            // [low, high, open, close, amount, quantity, buyTakerAmount, buyTakerQuantity, tradeCount, ts, weightedAverage, interval, startTime, closeTime]
            low: parseFloat(entry[0]),
            high: parseFloat(entry[1]),
            open: parseFloat(entry[2]),
            close: parseFloat(entry[3]),
            amount: parseFloat(entry[4]),            // quote volume
            quantity: parseFloat(entry[5]),          // base volume
            buyTakerAmount: parseFloat(entry[6]),    // quote volume (buy-taker)
            buyTakerQuantity: parseFloat(entry[7]),  // base volume (buy-taker)
            tradeCount: Number(entry[8]),
            ts: Number(entry[9]),
            weightedAverage: parseFloat(entry[10]),
            interval: entry[11],
            startTime: Number(entry[12]),
            closeTime: Number(entry[13]),
        };
    }

    static parseCandles(data) {
        return data.map(candle => PoloniexParser.toLightweightCandle(PoloniexParser.parseCandle(candle)));
    }

    static toLightweightCandle(parsed) {
        return {
            time: new Date(parsed.startTime)
                .toISOString()
                .split('T')[0],
            open: parsed.open,
            high: parsed.high,
            low: parsed.low,
            close: parsed.close,
        };
    }

}

export default PoloniexParser;
