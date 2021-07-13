const dateFormat = require("dateformat");

exports.secondsToDateString = function (seconds) {
  const lastModifiedDate = convertToKoreanDate(seconds);
  const lastModifiedDateString = dateFormat(lastModifiedDate, `yyyy.mm.dd ${getDayKoreaLabel(lastModifiedDate.getDay())} HH:MM`);
  return lastModifiedDateString;
}

function convertToKoreanDate(seconds) {
  let date = new Date(1970, 0, 1);
  date.setSeconds(seconds);
  date.setHours(date.getHours() + 9);
  return date;
}

function getDayKoreaLabel(dayIndex) {
  var week = new Array('일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일');
  var todayLabel = week[dayIndex];
  return todayLabel;
}