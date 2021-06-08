const { google } = require('googleapis');
const unirest = require('unirest');
const config = require('../config');
const crawler = require('./crawler')
const gkeys = require('../butler-316109-cc49583efdf2.json');


async function NotifyLauchMenu() {
  const googleChatRoomID = config.google_chat_room_id;
  const pageUrl = 'https://www.instagram.com/iganepork/';
  const imageUrl = await crawler.fetchTodayLaunchMenu();
  const iconUrl = config.google_chat_lauch_menu_icon;

  if (imageUrl) {
    postMessage(googleChatRoomID, pageUrl, imageUrl, iconUrl);
  } else {
    console.log('Fail FetchTodayLaunchMenu');
  }
}

function getJWT() {
  return new Promise(function (resolve, reject) {
    let jwtClient = new google.auth.JWT(
      gkeys.client_email,
      null,
      gkeys.private_key, ['https://www.googleapis.com/auth/chat.bot']
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

function postMessage(roomID, pageUrl, imageUrl, iconUrl) {
  return new Promise(function (resolve, reject) {
    getJWT().then(function (token) {
      unirest.post(`https://chat.googleapis.com/v1/spaces/${roomID}/messages`)
        .headers({
          "Content-Type": "application/json",
          "Authorization": "Bearer " + token
        })
        .send({
          "cards": [
            {
              "sections": [
                {
                  "widgets": [
                    {
                      "image": { "imageUrl": imageUrl }
                    },
                    {
                      "buttons": [
                        {
                          "imageButton": {
                            "iconUrl": iconUrl,
                            "onClick": {
                              "openLink": {
                                "url": pageUrl
                              }
                            }
                          }
                        },
                        {
                          "textButton": {
                            "text": "자세히 보기",
                            "onClick": {
                              "openLink": {
                                "url": pageUrl
                              }
                            }
                          }
                        }
                      ]
                    }
                  ]
                }
              ]
            }
          ]
        })
        .end(function (res) {
          resolve();
        });
    }).catch(function (err) {
      reject(err);
    });
  });
}

NotifyLauchMenu();