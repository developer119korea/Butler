const schedule = require("node-schedule");

const config = require("../config");
const crawler = require("./crawler");
const googlechat = require("./googlechat");
const message = require("./message");
const shareSchedule = require("./shareSchedule");

async function NotifyLauchMenu() {
  const menuContent = await crawler.fetchTodayLaunchMenu();

  if (menuContent) {
    const roomID = config.google_chat_general_room_id;
    const threadID = config.google_chat_launch_thread_id;
    const iconUrl = config.google_chat_launch_menu_icon;
    const pageUrl = menuContent.pageUrl;
    const imageUrl = menuContent.imageUrl;
    const cardMessage = message.card(pageUrl, imageUrl, iconUrl);
    googlechat.postMessage(roomID, threadID, cardMessage);
  } else {
    const roomID = config.google_chat_analytics_room_id;
    const threadID = config.google_chat_launch_thread_id;
    const textMessage = message.text("Failed FetchTodayLaunchMenu")
    googlechat.postMessage(roomID, threadID, textMessage);
  }
}

const lauchMenuRule = new schedule.RecurrenceRule();
lauchMenuRule.dayOfWeek = [0, new schedule.Range(1, 5)];
lauchMenuRule.hour = config.google_chat_launch_menu_noti_hour;
lauchMenuRule.minute = config.google_chat_launch_menu_noti_minute;
lauchMenuRule.tz = "Asia/Seoul";
schedule.scheduleJob(lauchMenuRule, NotifyLauchMenu);

const shareSchedulerRule = new schedule.RecurrenceRule();
shareSchedulerRule.dayOfWeek = config.google_chat_share_schedule_noti_dayofweek;
shareSchedulerRule.hour = config.google_chat_share_schedule_noti_hour;
shareSchedulerRule.minute = config.google_chat_share_schedule_noti_minute;
shareSchedulerRule.tz = "Asia/Seoul";
schedule.scheduleJob(shareSchedulerRule, shareSchedule.NotifyNewWeekThread);