const config = require("./config.json");
const holiday = require("../holiday");
const scrumMeetReminder = require("./index");

test = async () => {
  const roomID = config.analytics_room_id;
  const isHoliday = await holiday.itIsHolidayToday();
  if (!isHoliday) {
    scrumMeetReminder.notify(roomID);
  }
}
test();