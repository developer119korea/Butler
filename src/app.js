const { google } = require("googleapis");
const schedule = require("node-schedule");
const unirest = require("unirest");
const config = require("../config");
const crawler = require("./crawler");
const gkeys = require("../butler-316109-cc49583efdf2.json");

async function NotifyLauchMenu() {
  const googleChatRoomID = config.google_chat_room_id;
  const googleChatThreadID = config.google_chat_thread_id;
  const iconUrl = config.google_chat_launch_menu_icon;

  const menuContent = await crawler.fetchTodayLaunchMenu();
  const pageUrl = menuContent.pageUrl;
  const imageUrl = menuContent.imageUrl;

  if (imageUrl) {
    postMessage(
      googleChatRoomID,
      googleChatThreadID,
      pageUrl,
      imageUrl,
      iconUrl
    );
  } else {
    console.log("Fail FetchTodayLaunchMenu");
  }
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

function postMessage(roomID, threadID, pageUrl, imageUrl, iconUrl) {
  return new Promise(function (resolve, reject) {
    getJWT()
      .then(function (token) {
        unirest
          .post(
            `https://chat.googleapis.com/v1/spaces/${roomID}/messages?thread_key=${threadID}`
          )
          .headers({
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          })
          .send({
            cards: [
              {
                sections: [
                  {
                    widgets: [
                      {
                        image: { imageUrl: imageUrl },
                      },
                      {
                        buttons: [
                          {
                            imageButton: {
                              iconUrl: iconUrl,
                              onClick: {
                                openLink: {
                                  url: pageUrl,
                                },
                              },
                            },
                          },
                          {
                            textButton: {
                              text: "자세히 보기",
                              onClick: {
                                openLink: {
                                  url: pageUrl,
                                },
                              },
                            },
                          },
                        ],
                      },
                    ],
                  },
                ],
              },
            ],
          })
          .end(function (res) {
            resolve();
          });
      })
      .catch(function (err) {
        reject(err);
      });
  });
}

const rule = new schedule.RecurrenceRule();
rule.dayOfWeek = [0, new schedule.Range(1, 5)];
rule.hour = config.google_chat_launch_menu_noti_hour;
rule.minute = config.google_chat_launch_menu_noti_minute;
rule.tz = "Asia/Seoul";
schedule.scheduleJob(rule, NotifyLauchMenu);
