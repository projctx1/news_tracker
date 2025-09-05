require('dotenv').config()
const express = require('express');
const app = express();
const port = process.env.PORT;
const fs = require('fs');
import session from 'express-session';
const https = require('https');
const path = require('path');
import cognitoRoutes from "./routes/cognito.routes.js";
import scrapperRoutes from "./routes/scrapperurl.routes.js";
import s3Routes from "./routes/uploads.route.js";
require('./db/config/mongoose.config.js');

app.use(session({
    secret: process.env.SESSION_SECRET || 'SESSION_SECRET',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: true }
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use("/api/auth", cognitoRoutes);

app.use("/api/scrapper", scrapperRoutes);

app.use("/api/s3", s3Routes);

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

const PORT = process.env.PORT || 3007

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});

if (process.env.NODE_ENV !== 'production') {
    // Self-signed cert for local dev
    const options = {
        //key: fs.readFileSync(path.join(__dirname, 'certs', 'localhost.key')),
        //cert: fs.readFileSync(path.join(__dirname, 'certs', 'localhost.crt'))
    };

    https.createServer(options, app).listen(30071, () => {
        console.log('HTTPS Dev Server running at https://localhost:30071');
    });
}