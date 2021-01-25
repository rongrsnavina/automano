const fs = require('dotenv');
fs.config()
const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] })
    const page = await browser.newPage()

    await page.evaluateOnNewDocument(function() {
        navigator.geolocation.getCurrentPosition = function (cb) {
            setTimeout(() => {
                cb({
                    'coords': {
                        accuracy: 21,
                        altitude: null,
                        altitudeAccuracy: null,
                        heading: null,
                        latitude: 32.07948174948672,
                        longitude: 34.79441454362365,
                        speed: null
                    }
                })
            }, 1000)
        }
    });

    await page.goto('https://app.meckano.co.il/login.php')
    await page.type('#email', process.env.MECKANO_USER)
    await page.type('#password', process.env.MECKANO_PASS)
    await page.click('[name="submit"]')
    await page.waitForNavigation()

    //Checkout
    await page.waitForSelector('.wrapperCheckout')
    await page.click('.wrapperCheckout')

    await new Promise(r => setTimeout(r, 10000));

    await browser.close()
})().catch((exception) => console.log(exception)).finally(() => process.exit())
