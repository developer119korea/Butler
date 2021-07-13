const config = require("../../jsonFiles/config.json");
const googlechat = require("../googlechat");
const message = require("../message");
const chatMessage = require("../../jsonFiles/chatDescription.json");
const nextWeekPeriodText = require("../nextWeekPeriodText");

module.exports.NotifyNewWeekThread = function () {
  const periodText = nextWeekPeriodText.get();
  const description = chatMessage.shareSchedule.replace('{periodText}', periodText);
  const roomID = config.google_chat_share_schedule_room_id;
  const textMessage = message.text(description);
  googlechat.postMessage(roomID, null, textMessage);
}