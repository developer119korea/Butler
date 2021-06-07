const config = require('../config');
const chrome_driver = require('chromedriver');
const webdriver = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');

const instagram = require("./instagram");
const iganepork = require("./iganepork");

const sleep = (waitTimeInMs) => new Promise(resolve => setTimeout(resolve, waitTimeInMs));
const kAwaitMilliSecondWebPageLoading = 3000;


module.exports.fetchTodayLaunchMenu = async () => {
  const service = new chrome.ServiceBuilder(chrome_driver.path).build();
  chrome.setDefaultService(service);
  const driver = await new webdriver.Builder().forBrowser('chrome').build();

  const id = config.instagram_id;
  const password = config.instagram_pw;

  await instagram.login(driver, id, password);

  await sleep(kAwaitMilliSecondWebPageLoading);

  const launchMenuImageUrl = await iganepork.fetchTodayLaunchMenuUrl(driver);
  console.log(launchMenuImageUrl);

  await driver.close();
  await driver.quit();

  return launchMenuImageUrl;
}
