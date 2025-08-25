const puppeteer = require('puppeteer');
const fs = require('fs');
const urlModule = require('url');

import ScrappedDataFile from '../models/scrappeddatafile.model';
import ScraperURL from '../models/scraperurl.model';

import logError from './logError';
import s3upload from './s3upload';

//need a user agents and browser settings module for randomizing browser settings and user agents per call to the same url
function getApex(url) {
    const { hostname } = new URL(url);
    return hostname.replace(/^www\./, '');
}

async function runScrapper() {
    const urls = [
        'https://stockanalysis.com/news/'
    ];

    await Promise.all(
        urls.map(async url => {
            const urlapex = getApex(url);
            let existing = await ScraperURL.findOne({ url });

            try {
                if (!existing) {
                    existing = new ScraperURL({
                        url,
                        urlapex
                    });

                    await existing.save();

                    console.log(`✅ Created new ScraperURL for: ${url}`);
                }
            } catch (error) {
                logError({ errorDescription: `Error from runScrapper function`, error });
            }

            scrapUrlAndSaveToDb({ url, urlSource: existing._id });
        })
    );
}

async function scrapUrlAndSaveToDb({ url, urlSource }) {
    try {
        const browser = await puppeteer.launch({
            headless: 'new',
            executablePath: process.env.PUPPETEER_EXECUTABLE_PATH,
            args: ['--no-sandbox', '--disable-setuid-sandbox'],
        });


        const page = await browser.newPage();
        await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36');
        await page.goto(url, { waitUntil: 'domcontentloaded' });

        const bodyContent = await page.evaluate(() => {
            return document.body.outerHTML;
        });

        const subLinks = await page.evaluate(() => {
            return Array.from(document.querySelectorAll('a'))
                .map(a => ({
                    text: a.innerText.trim(),
                    href: a.href
                }))
                .filter(link => link.href);
        });

        const parsedUrl = urlModule.parse(url);

        console.log(parsedUrl)

        //_${parsedUrl.hostname.replace(/\./g, '_')}${parsedUrl.pathname.replace(/\//g, '_')

        const newScrappedDataFile = new ScrappedDataFile({ urlSource, subLinks })

        //console.log(newScrappedDataFile)

        const fileName = `${newScrappedDataFile._id}`;
        const Body = Buffer.from(bodyContent, "utf8");
        const ContentType = "text/html; charset=utf-8";
        const folder = 'scrappedhtml';

        //console.log(fileName, Body, ContentType, folder)

        const scrappedDataFileUrl = await s3upload({ Body, ContentType, folder, fileName: `${fileName}.html` })

        newScrappedDataFile.url = scrappedDataFileUrl;

        await newScrappedDataFile.save();

        console.log(newScrappedDataFile);

        //fs.writeFileSync(`${fileName}.html`, bodyContent, 'utf8');

        //fs.writeFileSync(`${fileName}.txt`, bodyContent, 'utf8');

        await browser.close();
    } catch (error) {
        logError({ errorDescription: `Error from scrapUrlAndSaveToDb function`, error })
    }
}

module.exports = {
    runScrapper
}