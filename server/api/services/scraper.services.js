const puppeteer = require('puppeteer');
const fs = require('fs');
const urlModule = require('url');

async function scrapAndSaveToDb({ url }) {
    const browser = await puppeteer.launch({
        headless: true,
        args: ['--no-sandbox'],
    });

    const page = await browser.newPage();
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36');
    await page.goto(url, { waitUntil: 'domcontentloaded' });

    const bodyContent = await page.evaluate(() => {
        return document.body.outerHTML;
    });

    const parsedUrl = urlModule.parse(url);
    const fileName = `${parsedUrl.hostname.replace(/\./g, '_')}${parsedUrl.pathname.replace(/\//g, '_') || '_index'}`;

    fs.writeFileSync(`${fileName}.html`, bodyContent, 'utf8');

    fs.writeFileSync(`${fileName}.txt`, bodyContent, 'utf8');

    await browser.close();
}

module.exports = {
    scrapAndSaveToDb
};
