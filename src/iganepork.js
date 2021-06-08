const webdriver = require('selenium-webdriver');

const By = webdriver.By;
const kAwaitMilliSecondWebPageLoading = 3000;

const kSelectorFirstArticleThumnail = "#react-root > section > main > div > div._2z6nI > article > div:nth-child(1) > div > div:nth-child(1) > div:nth-child(1) > a > div > div._9AhH0";
const kSelectorArticlePublishedDate = "body > div._2dDPU.CkGkG > div.zZYga > div > article > div.eo2As > div.k_Q0X.I0_K8.NnvRN > a > time";
const kClassNameNextArticleButton = " _65Bje  coreSpriteRightPaginationArrow";
const kClassNameNextImageButton = "coreSpriteRightChevron";
const kSelectorImage = "body > div._2dDPU.CkGkG > div.zZYga > div > article > div._97aPb > div > div.pR7Pc > div.Igw0E.IwRSH.eGOV_._4EzTm.O1flK.D8xaz.fm1AK.TxciK.yiMZG > div > div > div > ul > li:nth-child(2) > div > div > div > div.KL4Bh > img";

const sleep = (waitTimeInMs) => new Promise(resolve => setTimeout(resolve, waitTimeInMs));

module.exports.fetchTodayLaunchMenu = async (driver) => {
  await driver.get('https://www.instagram.com/iganepork/');
  await sleep(kAwaitMilliSecondWebPageLoading);

  // 첫번째 게시물 클릭
  const elementArticleThumnail = await driver.findElement(By.css(kSelectorFirstArticleThumnail));
  await elementArticleThumnail.click();

  const serverDate = new Date(Date.now());

  do {
    await sleep(kAwaitMilliSecondWebPageLoading);

    // 게시물의 날짜 정보 가져오기
    const publishedDate = await getPublishedDate(driver);

    // 오늘자 게시물인지 확인
    const isToday = isItToday(serverDate, publishedDate);

    if (!isToday)
      return null;

    // 점심메뉴 게시물인지 확인
    const isLaunchMenuArticle = await isItLaunchMenuArticle(driver);
    var isClickedNextArticle = false;

    // 점심메뉴 게시글이라면 메뉴 사진 Url추출
    if (isLaunchMenuArticle) {
      const imageUrl = await getLaunchMenuImageUrl(driver);
      const pageUrl = await driver.getCurrentUrl();
      const menuContent = {
        pageUrl: pageUrl,
        imageUrl: imageUrl
      }
      return menuContent;
    }
    else {
      isClickedNextArticle = await clickNextArticleButton(driver);
    }
  } while (isClickedNextArticle)
  return null;
}

async function getPublishedDate(driver) {
  const elementPublishedDate = await driver.findElement(By.css(kSelectorArticlePublishedDate));
  const dateTimeISO = await elementPublishedDate.getAttribute("datetime");
  return new Date(dateTimeISO);
}

function isItToday(originDate, targetDate) {
  return originDate.getFullYear() == targetDate.getFullYear()
    && originDate.getMonth() == targetDate.getMonth()
    && originDate.getDate() == targetDate.getDate();
}

async function isItLaunchMenuArticle(driver) {
  try {
    const elementNextImageButton = await driver.findElement(By.className(kClassNameNextImageButton));
    return elementNextImageButton != null;
  }
  catch (error) {
    const currentUrl = await driver.getCurrentUrl();
    console.log("not Launch Menu Article\n", currentUrl);
    return false;
  }
}

async function clickNextArticleButton(driver) {
  try {
    const button = await driver.findElement(By.className(kClassNameNextArticleButton));
    button.click();
    return true;
  }
  catch (error) {
    const currentUrl = await driver.getCurrentUrl();
    console.log("does not exist Next Article Button\n", currentUrl);
    return false;
  }
}

async function getLaunchMenuImageUrl(driver) {
  try {
    const image = await driver.findElement(By.css(kSelectorImage));
    const url = await image.getAttribute("src");
    return url;
  }
  catch (error) {
    const currentUrl = await driver.getCurrentUrl();
    console.log("does not exist image URL\n", currentUrl);
    return "";
  }
}