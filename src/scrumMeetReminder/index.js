const config = require("../../jsonFiles/config.json");
const chatMessage = require("../../jsonFiles/chatDescription.json");
const googlechat = require("../googlechat");
const message = require("../message");

module.exports.Notify = function () {
  let description = chatMessage.scrumMeetReminder;
  const roomID = config.google_chat_scrum_meet_reminder_room_id;
  const textMessage = message.text(description);
  googlechat.postMessage(roomID, null, textMessage);
}