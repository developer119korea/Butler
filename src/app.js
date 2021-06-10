const schedule = require("node-schedule");
const config = require("../config");
const shareSchedule = require("./shareSchedule/shareSchedule");
const lunchMenu = require("./lunchMenu/lunchMenu");

const lunchMenuRule = new schedule.RecurrenceRule();
lunchMenuRule.dayOfWeek = [0, new schedule.Range(1, 5)];
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