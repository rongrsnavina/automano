const fs = require("dotenv");
const io = require("@actions/io");
fs.config();
const puppeteer = require("puppeteer");

const isDebug = false;
let page;

(async () => {
  const browser = await puppeteer.launch({
    headless: !isDebug,
    args: ["--no-sandbox"],
  });
  await io.mkdirP(`screenshots`);
  page = await browser.newPage();
  page.on("console", (msg) => console.log("PAGE LOG:", msg.text()));

  await page.evaluateOnNewDocument(function () {
    navigator.geolocation.getCurrentPosition = function (cb) {
      setTimeout(() => {
        cb({
          coords: {
            accuracy: 21,
            altitude: null,
            altitudeAccuracy: null,
            heading: null,
            latitude: 32.07948174948672,
            longitude: 34.79441454362365,
            speed: null,
          },
        });
      }, 1000);
    };
  });

  await page.goto("https://app.meckano.co.il/login.php");
  await page.waitForSelector("#email", { visible: true, timeout: 5000 });
  await page.type("#email", process.env.MECKANO_USER);
  await page.waitForSelector("#password", { visible: true, timeout: 5000 });
  await page.type("#password", process.env.MECKANO_PASS);

  await Promise.all([
    page.waitForNavigation(),
    page.click('[value="התחברות"]'),
  ]);


  // if ((new Date()).getHours() < 12) {
  //     //Checkin
  //     if (!isDebug)
  //         await new Promise(r => setTimeout(r, Math.floor(Math.random() * 15 * 60 * 1000)));
  //     await page.waitForSelector('.wrapperCheckin')
  //     await page.click('.wrapperCheckin')
  //
  //     try{
  //         await page.waitForSelector('.yesNo')
  //         await page.select('.yesNo', 'כן')
  //         await page.click('.buttonNext')
  //
  //         await new Promise(r => setTimeout(r, 3000));
  //
  //         await page.waitForSelector('.yesNo')
  //         await page.select('.yesNo', 'כן')
  //         await page.click('.buttonNext')
  //     } catch (e) {
  //         console.log(e)
  //     }
  // } else {
  //     //Checkout
  //     if (!isDebug)
  //         await new Promise(r => setTimeout(r, Math.floor(Math.random() * 15 * 60 * 1000)));
  //     await page.waitForSelector('.wrapperCheckout')
  //     await page.click('.wrapperCheckout')
  // }

  await new Promise((r) => setTimeout(r, 5000));

  await browser.close();
})()
  .catch((exception) => {
    console.log(exception);
    return page.screenshot({
      fullPage: true,
      path: `screenshots/${new Date().getTime()}.png`,
    });
  })
  .finally(() => process.exit());
