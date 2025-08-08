require('dotenv').config();
const mongoose = require('../config/mongoose.config');
const axios = require('axios');
const OutsourceArticle = require('../models/news.model');

async function getNews() {
     while (true) {
        console.log(" Fetching crypto news feed...");

        try {
          const apiKey = process.env.NEWSDATA_API_KEY;
          const url = `https://newsdata.io/api/1/news?apikey=${apiKey}&q=crypto&language=en`;

          const response = await axios.get(url);
          const newsResponse = response.data;

          if (newsResponse && Array.isArray(newsResponse.results)) {
            for (const article of newsResponse.results) {
              if (!article.link || !article.title) continue;

              const exists = await OutsourceArticle.exists({ title: article.title });
              if (!exists) {
                await OutsourceArticle.create({
                  title: article.title,
                  meta_data: JSON.stringify(article),
                  is_posted: false
                });
              }
            }

            console.log(" News articles saved.");
          }
        } catch (error) {
          console.error(" Error fetching crypto news:", error.message);
        }

        // Wait 1 hour before running again
        await new Promise(resolve => setTimeout(resolve, 60 * 60 * 1000));
      }
}

module.exports  = {
    getNews
}