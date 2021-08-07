const schedule = require("node-schedule");
const config = require("./config.json");
const googlechat = require("../googlechat");
const message = require("../message");

exports.test = () => {
  const roomID = config.analytics_room_id;
  notify(roomID);
}

exports.start = () => {
  const okrReminderRule = new schedule.RecurrenceRule();
  okrReminderRule.dayOfWeek = config.noti_dayofweek;
  okrReminderRule.hour = config.noti_hour;
  okrReminderRule.minute = config.noti_minute;
  okrReminderRule.tz = "Asia/Seoul";
  const roomID = config.room_id;
  schedule.scheduleJob(okrReminderRule, () => notify(roomID));
}

function notify(roomID) {
  let description = config.description;
  const textMessage = message.text(description);
  googlechat.postMessage(roomID, null, textMessage);
}