require('dotenv').config()
const express = require('express');
const app = express();
const port = process.env.PORT;
const fs = require('fs');
import session from 'express-session';
const https = require('https');
const path = require('path');

require('./db/config/mongoose.config.js');

app.use(session({
    secret: process.env.SESSION_SECRET || 'SESSION_SECRET',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: true }
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

import twitterRoute from './routes/twitter.routes.js';

app.use('/api/twitter', twitterRoute);

const { getTweets } = require('./services/twitter.services');

//setup cronjobs
setInterval(getTweets, 3600000);    // every hour

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

const PORT = process.env.PORT || 3003

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
