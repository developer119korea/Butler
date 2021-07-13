const config = require("../../jsonFiles/config.json");
const reviews = require("./googleReview");
const noticeHistory = require("./noticeHistory");
const googleChat = require("../googlechat");
const message = require('../message');
const appPackageName = config.google_app_package_name;

module.exports.pull = async () => {
  var isFake = false;
  var reviewsJsonString;
  if (isFake) {
    reviewsJsonString = reviews.getFakeReviews();
  } else {
    const reviewsJson = await reviews.getReviews(appPackageName);
    reviewsJsonString = JSON.stringify(reviewsJson);
    console.log(reviewsJsonString);
  }

  const reviewsJson = JSON.parse(reviewsJsonString);
  const history = noticeHistory.load();
  const newReviews = filterNewReview(reviewsJson.reviews, history);
  notify(newReviews);
  noticeHistory.save(history, newReviews);
}

function notify(reviews) {
  for (const review of reviews) {
    const roomID = config.google_chat_app_review_room_id;
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