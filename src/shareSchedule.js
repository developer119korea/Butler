const config = require("../config");
const googlechat = require("./googlechat");
const message = require("./message");
const chatMessage = require("../res/chatDescription.json");

module.exports.NotifyNewWeekThread = function () {
  const periodText = getNextWeekPeriodText();
  const description = chatMessage.shareSchedule.replace('{periodText}', periodText);
  const roomID = config.google_chat_share_schedule_room_id;
  const textMessage = message.text(description);
  googlechat.postMessage(roomID, null, textMessage);
}

function getNextWeekPeriodText() {
  const dayNames = ['일', '월', '화', '수', '목', '금', '토', '일'];
  const today = new Date(Date.now());
  const currentTimeZoneOffsetInHours = today.getTimezoneOffset() * 60 * 1000;
  today.setTime(today.getTime() - currentTimeZoneOffsetInHours);
  const daysDiff = 5 - today.getDay();
  const thisFriday = new Date();
  thisFriday.setTime(today.getTime());
  thisFriday.setDate(today.getDate() + daysDiff);
  const nextFriday = new Date();
  nextFriday.setTime(thisFriday.getTime());
  nextFriday.setDate(thisFriday.getDate() + 7);
  const nextMonday = new Date();
  nextMonday.setTime(nextFriday.getTime());
  nextMonday.setDate(nextFriday.getDate() - 4);
  const nextWeekPeriodText = `${nextMonday.getMonth() + 1}/${nextMonday.getDate()}(${dayNames[nextMonday.getDay()]})~${nextFriday.getMonth() + 1}/${nextFriday.getDate()}(${dayNames[nextFriday.getDay()]})`;
  return nextWeekPeriodText;
}