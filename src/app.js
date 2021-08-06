const schedule = require("node-schedule");
const lunchMenu = require("./lunchMenu");
const shareSchedule = require("./shareSchedule");
const workingRemotly = require("./workingRemotly");
const okrReminder = require("./okrReminder");
const googleReview = require("./googleReview");
const config = require("../jsonFiles/config.json");

schedule.scheduleJob('0 0/5 * * * *', googleReview.pull);

const lunchMenuRule = new schedule.RecurrenceRule();
lunchMenuRule.dayOfWeek = new schedule.Range(1, 5);
lunchMenuRule.hour = config.google_chat_lunch_menu_noti_hour;
lunchMenuRule.minute = config.google_chat_lunch_menu_noti_minute;
lunchMenuRule.tz = "Asia/Seoul";
schedule.scheduleJob(lunchMenuRule, lunchMenu.Notify);

const shareSchedulerRule = new schedule.RecurrenceRule();
shareSchedulerRule.dayOfWeek = config.google_chat_share_schedule_noti_dayofweek;
shareSchedulerRule.hour = config.google_chat_share_schedule_noti_hour;
shareSchedulerRule.minute = config.google_chat_share_schedule_noti_minute;
shareSchedulerRule.tz = "Asia/Seoul";
schedule.scheduleJob(shareSchedulerRule, shareSchedule.NotifyNewWeekThread);

const workingRemotlyRule = new schedule.RecurrenceRule();
workingRemotlyRule.dayOfWeek = config.google_chat_working_remotly_noti_dayofweek;
workingRemotlyRule.hour = config.google_chat_working_remotly_noti_hour;
workingRemotlyRule.minute = config.google_chat_working_remotly_noti_minute;
workingRemotlyRule.tz = "Asia/Seoul";
schedule.scheduleJob(workingRemotlyRule, workingRemotly.NotifyNewWeekThread);

const okrReminderRule = new schedule.RecurrenceRule();
okrReminderRule.dayOfWeek = config.google_chat_okr_reminder_noti_dayofweek;
okrReminderRule.hour = config.google_chat_okr_reminder_noti_hour;
okrReminderRule.minute = config.google_chat_okr_reminder_noti_minute;
okrReminderRule.tz = "Asia/Seoul";
schedule.scheduleJob(okrReminderRule, okrReminder.Notify);
