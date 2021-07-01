const config = require("../../config");
const crawler = require("./crawler");
const googlechat = require("../googlechat");
const message = require("../message");

module.exports.Notify = async function () {
  const menuContent = await crawler.fetchTodayLunchMenu();

  if (menuContent) {
    const roomID = config.google_chat_general_room_id;
    const threadID = null;
    const iconUrl = config.google_chat_lunch_menu_icon;
    const pageUrl = menuContent.pageUrl;
    const imageUrl = menuContent.imageUrl;
    const cardMessage = message.card(pageUrl, imageUrl, iconUrl);
    googlechat.postMessage(roomID, threadID, cardMessage);
  } else {
    const roomID = config.google_chat_analytics_room_id;
    const threadID = null;
    const textMessage = message.text("Failed FetchTodayLunchMenu")
    googlechat.postMessage(roomID, threadID, textMessage);
  }
}