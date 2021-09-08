const schedule = require("node-schedule");
const config = require("./config.json");
const crawler = require("./crawler");
const googlechat = require("../googlechat");
const message = require("../message");

exports.test = () => {
  const roomID = config.analytics_room_id;
  notify(roomID);
}

exports.directShot = () => {
  const roomID = config.room_id;
  notify(roomID);
}

exports.start = () => {
  const lunchMenuRule = new schedule.RecurrenceRule();
  lunchMenuRule.dayOfWeek = new schedule.Range(1, 5);
  lunchMenuRule.hour = config.noti_hour;
  lunchMenuRule.minute = config.noti_minute;
  lunchMenuRule.tz = "Asia/Seoul";
  const roomID = config.room_id;
  schedule.scheduleJob(lunchMenuRule, () => notify(roomID));
}

notify = async (roomID) => {
  const menuContent = await crawler.fetchTodayLunchMenu();

  if (menuContent) {
    const threadID = null;
    const iconUrl = config.lunch_menu_icon;
    const pageUrl = menuContent.pageUrl;
    const imageUrl = menuContent.imageUrl;
    const cardMessage = message.card(pageUrl, imageUrl, iconUrl);
    googlechat.postMessage(roomID, threadID, cardMessage);
  } else {
    const analyticsRoomID = config.analytics_room_id;
    const threadID = null;
    const textMessage = message.text("Failed FetchTodayLunchMenu")
    googlechat.postMessage(analyticsRoomID, threadID, textMessage);
  }
}