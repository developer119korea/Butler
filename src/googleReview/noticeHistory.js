const fs = require('fs');
const appRoot = require('app-root-path');
const filePath = `${appRoot}/res/reviewNotifyHistory.json`;

exports.save = function (history, reviews) {
  for (const review of reviews) {
    console.log("push : ", review.reviewId);
    history.ids.push(review.reviewId);
  }
  fs.writeFileSync(filePath, JSON.stringify(history));
}

exports.load = function () {
  let history = {};
  const isExits = fs.existsSync(filePath);
  if (isExits) {
    const json = fs.readFileSync(filePath, 'utf8');
    history = JSON.parse(json);
  } else {
    history.ids = [];
  }
  return history;
}