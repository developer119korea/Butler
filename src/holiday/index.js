const fs = require('fs');
const appRoot = require('app-root-path');
const xml2json = require('xml-js');
const unirest = require("unirest");
const dateUtil = require("../dateUtil");
const config = require("./config.json");

const fileDir = `${appRoot}/jsonFiles`;

exports.itIsHolidayToday = async () => {
  const isHoliday = await exports.isHoliday(new Date());
  return isHoliday;
}

exports.isHoliday = async function (date) {
  const holidays = await getHolidays(date.getFullYear());
  const dateLabel = dateUtil.holidayLabel(date);
  const result = contain(holidays, dateLabel);
  console.log(dateLabel, " isHoliday : ", result);
  return result;
}

exports.test = async function () {
  const date = new Date(2021, 7, 16);
  const isHolidayDate = await exports.isHoliday(date);
  console.log("isHoliday :", isHolidayDate);
}

async function getHolidays(year) {
  const filePath = `${fileDir}/holiday-${year}.json`;
  const holidays = load(filePath);

  if (holidays.item.length <= 0) {
    const freshData = await fetch();
    save(filePath, freshData);
    return freshData;
  }
  //@TODO: 한달에 한번 정도는 갱신할 수 있도록 수정 (대체 휴무일 정보가 추가 될수 있기에)
  // const freshData = await fetch();
  // const mergedData = merge(originData, freshData);
  // save(filePath, mergedData);
  return holidays;
}

async function fetch() {
  var url = config.url;
  var queryParams = '?' + encodeURIComponent('ServiceKey') + '=' + config.service_key; /* Service Key*/
  queryParams += '&' + encodeURIComponent('pageNo') + '=' + encodeURIComponent('1'); /* */
  queryParams += '&' + encodeURIComponent('numOfRows') + '=' + encodeURIComponent('100'); /* */
  queryParams += '&' + encodeURIComponent('solYear') + '=' + encodeURIComponent('2021'); /* */
  return new Promise(function (resolve, reject) {
    unirest.get(url + queryParams).end((res) => {
      const xmlToJson = xml2json.xml2json(res.body, { compact: true, spaces: 4 });
      const jsonObject = JSON.parse(xmlToJson);
      resolve(jsonObject.response.body.items);
    })
  });
};

function contain(holidays, holidayDateLabel) {
  for (var day of holidays.item) {
    if (day.locdate._text === holidayDateLabel) {
      return true;
    }
  }
  return false;
}

function load(filePath) {
  const isExits = fs.existsSync(filePath);
  if (isExits) {
    const json = fs.readFileSync(filePath, 'utf8');
    const holiday = JSON.parse(json);
    return holiday;
  } else {
    return { item: [] };
  }
};

function merge(origin, addition) {
  var newHoliday = { item: [] };
  for (var holiday of addition.item) {
    if (!contain(origin, holiday.locdate._text)) {
      newHoliday.item.push(holiday);
    }
  }
  return { item: origin.item.concat(newHoliday.item) };
};

function save(filePath, holiday) {
  fs.writeFileSync(filePath, JSON.stringify(holiday));
};