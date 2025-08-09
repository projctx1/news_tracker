const fs = require('fs').promises;

import TopStock from '../models/topstocks.model';

const num = (v) => {
    if (v == null) return null;
    const s = String(v).replace(/[, ]+/g, '').trim(); // remove commas
    if (s === '' || s.toLowerCase() === 'null') return null;
    const n = Number(s);
    return Number.isNaN(n) ? null : n;
};

async function updateBiggestCompaniesStock() {
    try {
        const filename = 'biggest-companies-stocks.csv';
        const fileContent = await fs.readFile(filename, 'utf8');

        const lines = fileContent.split('\n').filter(line => line.trim() !== '');

        const stocksArr = lines.map(line => {
            const regex = /(".*?"|[^,]+)(?=\s*,|\s*$)/g;
            const parts = line.match(regex).map(p => p.replace(/^"|"$/g, ''));

            return {
                id: parts[0],
                symbol: parts[1],
                name: parts[2],
                sector: parts[3] || null,
                price: parts[4] ? parseFloat(parts[4]) : null,
                changePercent: parts[5] ? parts[5].trim() : null
            };
        }).filter(r => r.symbol && r.name);

        const key = (r) => `${r.symbol}::${r.name}`;
        const map = new Map();
        for (const r of stocksArr) map.set(key(r), r);

        const stocks = Array.from(map.values());

        const stockMongooseOperations = stocks.map(s => ({
            updateOne: {
                filter: { symbol: s.symbol, name: s.name },
                update: {
                    $set: {
                        rank: s.rank,
                        marketCap: s.marketCap,
                        price: s.price,
                        changePercent: s.changePercent,
                        revenue: s.revenue,
                        lastUpdatedAt: s.lastUpdatedAt
                    },
                    $setOnInsert: { symbol: s.symbol, name: s.name }
                },
                upsert: true
            }
        }));

        console.log(stockMongooseOperations);

        if (stockMongooseOperations.length) {
            await TopStock.bulkWrite(stockMongooseOperations, { ordered: false });
            console.log(`Upserted/updated ${stockMongooseOperations.length} stocks.`);
        }

        return stocks;
    } catch (error) {
        console.log(error)
    }
}


module.exports = {
    updateBiggestCompaniesStock
}