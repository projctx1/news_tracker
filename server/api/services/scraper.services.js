import puppeteer from 'puppeteer';

async function scrapAndSaveToDb({ url }) {
    const browser = await puppeteer.launch({
        headless: true,
        args: ['--no-sandbox'],
    });

    console.log(browser);
    console.log('hello there');
}
module.exports = {
    scrapAndSaveToDb
}