const schedule = require("node-schedule");
const config = require("../config");
const lunchMenu = require("./lunchMenu/lunchMenu");
const shareSchedule = require("./shareSchedule/shareSchedule");
const workingRemotly = require("./workingRemotly/workingRemotly");

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