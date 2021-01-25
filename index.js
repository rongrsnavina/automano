const fs = require('dotenv');
fs.config()
const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] })
    const page = await browser.newPage()
    await page.goto('https://app.meckano.co.il/login.php')
    await page.type('#email', process.env.MECKANO_USER)
    await page.type('#password', process.env.MECKANO_PASS)
    await page.click('[name="submit"]')
    await page.waitForNavigation()

    //Checkout
    await page.click('#checkout-button')
    await browser.close()
})()