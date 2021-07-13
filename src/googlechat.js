const { google } = require("googleapis");
const unirest = require("unirest");
const gkeys = require("../jsonFiles/butler-316109-cc49583efdf2.json");

module.exports.postMessage = function (roomID, threadID, message) {
  let postUrl;
  if (threadID) {
    postUrl = `https://chat.googleapis.com/v1/spaces/${roomID}/messages?thread_key=${threadID}`
  } else {
    postUrl = `https://chat.googleapis.com/v1/spaces/${roomID}/messages`;
  }

  return new Promise(function (resolve, reject) {
    getJWT()
      .then(function (token) {
        unirest
          .post(postUrl)
          .headers({
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          })
          .send(message)
          .end(function (res) {
            resolve();
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
      ["https://www.googleapis.com/auth/chat.bot"]
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