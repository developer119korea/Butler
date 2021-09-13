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
  const pxRoomID = config.px_room_id;
  const devRoomID = config.dev_room_id;
  schedule.scheduleJob(scrumMeetReminderRule, async () => {
    const isHoliday = await holiday.itIsHolidayToday();
    if (!isHoliday) {
      exports.notify(pxRoomID);
      exports.notify(devRoomID);
    }
  });
}

exports.notify = (roomID) => {
  let description = config.description;
  const textMessage = message.text(description);
  googlechat.postMessage(roomID, null, textMessage);
}