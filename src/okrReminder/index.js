const schedule = require("node-schedule");
const config = require("./config.json");
const googlechat = require("../googlechat");
const message = require("../message");
const holiday = require("../holiday");

exports.start = () => {
  const okrReminderRule = new schedule.RecurrenceRule();
  okrReminderRule.dayOfWeek = config.noti_dayofweek;
  okrReminderRule.hour = config.noti_hour;
  okrReminderRule.minute = config.noti_minute;
  okrReminderRule.tz = "Asia/Seoul";
  const roomID = config.room_id;
  schedule.scheduleJob(okrReminderRule, async () => {
    const isHoliday = await holiday.itIsHolidayToday();
    if (!isHoliday) {
      exports.notify(roomID)
    }
  });
}

exports.notify = (roomID) => {
  let description = config.description;
  const textMessage = message.text(description);
  googlechat.postMessage(roomID, null, textMessage);
}