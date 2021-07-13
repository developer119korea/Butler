const config = require("../../jsonFiles/config.json");
const chatMessage = require("../../jsonFiles/chatDescription.json");
const googlechat = require("../googlechat");
const message = require("../message");
const nextWeekPeriodText = require("../nextWeekPeriodText");

module.exports.NotifyNewWeekThread = function () {
  const periodText = nextWeekPeriodText.get();
  let description = chatMessage.workingRemotly.replace('{periodText}', periodText);
  description += `\n${config.google_chat_working_remotly_meet_id}`;
  const roomID = config.google_chat_working_remotly_room_id;
  const textMessage = message.text(description);
  googlechat.postMessage(roomID, null, textMessage);
}