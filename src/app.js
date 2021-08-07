const googleReview = require("./googleReview");
const lunchMenu = require("./lunchMenu");
const shareSchedule = require("./shareSchedule");
const workingRemotly = require("./workingRemotly");
const okrReminder = require("./okrReminder");
const scrumMeetReminder = require("./scrumMeetReminder");

googleReview.start();
lunchMenu.start();
shareSchedule.start();
workingRemotly.start();
okrReminder.start();
scrumMeetReminder.start();