const schedule = require("node-schedule");

const config = require("../config");
const crawler = require("./crawler");
const googlechat = require("./googlechat");
const message = require("./message");

async function NotifyLauchMenu() {
  const menuContent = await crawler.fetchTodayLaunchMenu();
  const pageUrl = menuContent.pageUrl;
  const imageUrl = menuContent.imageUrl;

  if (imageUrl) {
    const googleChatRoomID = config.google_chat_room_id;
    const googleChatThreadID = config.google_chat_thread_id;
    const iconUrl = config.google_chat_launch_menu_icon;
    const cardMessage = message.card(pageUrl, imageUrl, iconUrl);
    googlechat.postMessage(googleChatRoomID, googleChatThreadID, cardMessage);
  } else {
    console.log("Fail FetchTodayLaunchMenu");
  }
}

const rule = new schedule.RecurrenceRule();
rule.dayOfWeek = [0, new schedule.Range(1, 5)];
rule.hour = config.google_chat_launch_menu_noti_hour;
rule.minute = config.google_chat_launch_menu_noti_minute;
rule.tz = "Asia/Seoul";
schedule.scheduleJob(rule, NotifyLauchMenu);
