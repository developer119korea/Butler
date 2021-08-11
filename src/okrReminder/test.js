const config = require("./config.json");
const holiday = require("../holiday");
const okrReminder = require("./index");

test = async () => {
  const roomID = config.analytics_room_id;
  const isHoliday = await holiday.itIsHolidayToday();
  if (!isHoliday) {
    okrReminder.notify(roomID);
  }
}
test();