const schedule = require("node-schedule");
const config = require("./config.json");
const reviews = require("./googleReview");
const noticeHistory = require("./noticeHistory");
const googleChat = require("../googlechat");
const message = require('../message');

exports.test = () => {
  const roomID = config.analytics_room_id;
  pull(roomID);
}

exports.start = () => {
  const roomID = config.room_id;
  schedule.scheduleJob('0 0/5 * * * *', () => pull(roomID));
}

async function pull(roomID) {
  var isFake = false;
  var reviewsJsonString;
  if (isFake) {
    reviewsJsonString = reviews.getFakeReviews();
  } else {
    const appPackageName = config.google_app_package_name;
    const reviewsJson = await reviews.getReviews(appPackageName);
    reviewsJsonString = JSON.stringify(reviewsJson);
    console.log(reviewsJsonString);
  }

  const reviewsJson = JSON.parse(reviewsJsonString);
  const history = noticeHistory.load();
  const newReviews = filterNewReview(reviewsJson.reviews, history);
  notify(newReviews, roomID);
  noticeHistory.save(history, newReviews);
}

function notify(reviews, roomID) {
  for (const review of reviews) {
    const reviewMessage = message.review(review);
    googleChat.postMessage(roomID, null, reviewMessage);
  }
}

function filterNewReview(reviews, history) {
  let filteredReviews = [];
  for (const review of reviews) {
    if (history.ids.find(ids => ids === review.reviewId)) {
      continue;
    }
    filteredReviews.push(review);
  }
  return filteredReviews;
}