const webdriver = require('selenium-webdriver');

const By = webdriver.By;
const kAwaitMilliSecondWebPageLoading = 3000;

const kSelectorLoginFormInputfieldID = "#loginForm > div > div:nth-child(1) > div > label > input";
const kSelectorLoginFormInputfieldPW = "#loginForm > div > div:nth-child(2) > div > label > input";
const kSelectorLoginFormSubmitButton = "#loginForm > div > div:nth-child(3) > button";

const sleep = (waitTimeInMs) => new Promise(resolve => setTimeout(resolve, waitTimeInMs));

module.exports.login = async (driver, id, password) => {
  await driver.get('https://www.instagram.com');
  await sleep(kAwaitMilliSecondWebPageLoading);

  const loginFormInputFieldID = await driver.findElement(By.css(kSelectorLoginFormInputfieldID));
  await loginFormInputFieldID.sendKeys(id);
  const loginFormInputFieldPW = await driver.findElement(By.css(kSelectorLoginFormInputfieldPW));
  await loginFormInputFieldPW.sendKeys(password);
  const loginFormSubmitButton = await driver.findElement(By.css(kSelectorLoginFormSubmitButton));
  await loginFormSubmitButton.click();
}
