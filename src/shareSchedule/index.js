const schedule = require("node-schedule");
const config = require("./config.json");
const googlechat = require("../googlechat");
const message = require("../message");
const nextWeekPeriodText = require("../nextWeekPeriodText");

exports.test = () => {
  const roomID = config.analytics_room_id;
  notify(roomID);
}

exports.start = () => {
  const shareSchedulerRule = new schedule.RecurrenceRule();
  shareSchedulerRule.dayOfWeek = config.noti_dayofweek;
  shareSchedulerRule.hour = config.noti_hour;
  shareSchedulerRule.minute = config.noti_minute;
  shareSchedulerRule.tz = "Asia/Seoul";
  const roomID = config.room_id;
  schedule.scheduleJob(shareSchedulerRule, () => notify(roomID));
}

function notify(roomID) {
  const periodText = nextWeekPeriodText.get();
  const description = config.description.replace('{periodText}', periodText);
  const textMessage = message.text(description);
  googlechat.postMessage(roomID, null, textMessage);
}