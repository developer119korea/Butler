const schedule = require("node-schedule");
const config = require("./config.json");
const googlechat = require("../googlechat");
const message = require("../message");
const holiday = require("../holiday");

exports.start = () => {
  const scrumMeetReminderRule = new schedule.RecurrenceRule();
  scrumMeetReminderRule.dayOfWeek = new schedule.Range(1, 5);
  scrumMeetReminderRule.hour = config.noti_hour;
  scrumMeetReminderRule.minute = config.noti_minute;
  scrumMeetReminderRule.tz = "Asia/Seoul";
  const roomID = config.room_id;
  schedule.scheduleJob(scrumMeetReminderRule, async () => {
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