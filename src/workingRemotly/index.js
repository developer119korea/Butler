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
  const workingRemotlyRule = new schedule.RecurrenceRule();
  workingRemotlyRule.dayOfWeek = config.noti_dayofweek;
  workingRemotlyRule.hour = config.noti_hour;
  workingRemotlyRule.minute = config.noti_minute;
  workingRemotlyRule.tz = "Asia/Seoul";
  const roomID = config.room_id;
  schedule.scheduleJob(workingRemotlyRule, () => notify(roomID));
}

function notify(roomID) {
  const periodText = nextWeekPeriodText.get();
  let description = config.description.replace('{periodText}', periodText);
  description += `\n${config.meet_id}`;
  const textMessage = message.text(description);
  googlechat.postMessage(roomID, null, textMessage);
}