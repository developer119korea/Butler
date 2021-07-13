const { google } = require("googleapis");
const unirest = require("unirest");
const gkeys = require("../../jsonFiles/api-5253024070763610502-353789-581ddfce0378.json");
const fakeReviews = require("../../jsonFiles/fakeReview.json");

module.exports.getFakeReviews = function () {
  return JSON.stringify(fakeReviews, 'utf8');
}

module.exports.getReviews = async function (packageName) {
  return new Promise(function (resolve, reject) {
    getJWT()
      .then(function (token) {
        const url = `https://www.googleapis.com/androidpublisher/v3/applications/${packageName}/reviews?access_token=${token}&maxResults=100&translationLanguage=ko`;
        unirest
          .get(url)
          .headers({
            "Content-Type": "application/json",
            Authorization: token,
          })
          .send()
          .end(function (res) {
            resolve(res.body);
          });
      })
      .catch(function (err) {
        reject(err);
      });
  });
}

function getJWT() {
  return new Promise(function (resolve, reject) {
    let jwtClient = new google.auth.JWT(
      gkeys.client_email,
      null,
      gkeys.private_key,
      ['https://www.googleapis.com/auth/androidpublisher']
    );

    jwtClient.authorize(function (err, tokens) {
      if (err) {
        reject(err);
      } else {
        resolve(tokens.access_token);
      }
    });
  });
}