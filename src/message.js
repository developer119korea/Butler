const dateUtil = require("./dateUtil");
const language = require("./language");
const config = require("./../jsonFiles/config.json");

module.exports.card = function (pageUrl, imageUrl, iconUrl) {
  return {
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
  };
}

module.exports.text = function (text) {
  return {
    "text": text
  }
}

module.exports.review = function (review) {
  const googlePlayIconImage = config.img_url_google_play_icon;
  return {
    cards: [
      {
        header: {
          title: "Google Play Review",
          imageUrl: googlePlayIconImage,
        },
        sections: [
          getWidgetCreateInfo(review),
          getWidgetText(review),
          getWidgetRating(review),
          getWidgetAppVersion(review),
          getWidgetDeviceInfo(review),
          getWdigetLinkToManager(review)
        ],
      },
    ],
  };
}

function getWdigetLinkToManager(review) {
  const iconUrl = config.img_url_google_play_console_icon;
  const reviewId = review.reviewId;
  const url = config.google_review_manager_link.replace("${0}", reviewId);
  return {
    widgets: [
      {
        buttons: [
          {
            imageButton: {
              iconUrl: iconUrl,
              onClick: {
                openLink: {
                  url: url,
                },
              },
            },
          },
          {
            textButton: {
              text: "관리자 페이지",
              onClick: {
                openLink: {
                  url: url,
                },
              },
            },
          },
        ],
      },
    ],
  };
}

function getWidgetDeviceInfo(review) {
  const deviceMetadata = review.comments[0].userComment.deviceMetadata;
  if (deviceMetadata) {
    return {
      widgets: [
        {
          keyValue: {
            topLabel: "제조사",
            content: `${deviceMetadata.manufacturer}`
          },
        },
        {
          keyValue: {
            topLabel: "기기",
            content: `${deviceMetadata.productName}`
          }
        },
        {
          keyValue: {
            topLabel: "기기 종류",
            content: `${deviceMetadata.deviceClass}`
          }
        },
        {
          keyValue: {
            topLabel: "네이티브 플랫폼",
            content: `${deviceMetadata.nativePlatform}`
          }
        },
        {
          keyValue: {
            topLabel: "CPU",
            content: `${deviceMetadata.cpuModel}`
          }
        },
        {
          keyValue: {
            topLabel: "CPU 제조사",
            content: `${deviceMetadata.cpuMake}`
          }
        }
      ]
    };
  }
}

function getWidgetCreateInfo(review) {
  const authorName = review.authorName;
  const seconds = review.comments[0].userComment.lastModified.seconds
  const dateString = dateUtil.secondsToDateString(seconds);
  return {
    widgets: [
      {
        keyValue: {
          topLabel: "날짜",
          content: `${dateString}`
        },
      },
      {
        keyValue: {
          topLabel: "작성자",
          content: `${authorName}`
        }
      }
    ]
  };
}

function getWidgetAppVersion(review) {
  const versionName = review.comments[0].userComment.appVersionName;
  const versionCode = review.comments[0].userComment.appVersionCode;
  return {
    widgets: [
      {
        keyValue: {
          topLabel: "앱 버전 정보",
          content: `${versionName} (${versionCode})`,
          contentMultiline: true,
        }
      }
    ]
  };
}

function getWidgetText(review) {
  let text = review.comments[0].userComment.text;
  text = String(text).replace('\t', '');
  return {
    widgets: [
      {
        keyValue: {
          topLabel: "내용",
          content: `${text}`,
          contentMultiline: true,
        }
      },
      getOriginalText(review)
    ]
  };
}

function getOriginalText(review) {
  const languageName = language.getLanguageName(review.comments[0].userComment.reviewerLanguage);
  let originalText = review.comments[0].userComment.originalText;
  if (originalText) {
    originalText = String(originalText).replace('\t', '');
    return {
      keyValue: {
        topLabel: `원본 (${languageName})`,
        content: `${originalText}`,
        contentMultiline: true,
      }
    };
  }
}

function getWidgetRating(review) {
  const ratingPoint = review.comments[0].userComment.starRating;
  const storeLink = config.google_app_store_link;
  const starOnImageURL = config.img_url_star_on;
  const starOffImageURL = config.img_url_star_off;
  return {
    widgets: [
      {
        buttons: [
          {
            imageButton: {
              iconUrl: `${ratingPoint >= 1 ? starOnImageURL : starOffImageURL}`,
              onClick: {
                openLink: {
                  url: storeLink
                }
              }
            }
          },
          {
            imageButton: {
              iconUrl: `${ratingPoint >= 2 ? starOnImageURL : starOffImageURL} `,
              onClick: {
                openLink: {
                  url: storeLink
                }
              }
            }
          },
          {
            imageButton: {
              iconUrl: `${ratingPoint >= 3 ? starOnImageURL : starOffImageURL} `,
              onClick: {
                openLink: {
                  url: storeLink
                }
              }
            }
          },
          {
            imageButton: {
              iconUrl: `${ratingPoint >= 4 ? starOnImageURL : starOffImageURL} `,
              onClick: {
                openLink: {
                  url: storeLink
                }
              }
            }
          },
          {
            imageButton: {
              iconUrl: `${ratingPoint >= 5 ? starOnImageURL : starOffImageURL} `,
              onClick: {
                openLink: {
                  url: storeLink
                }
              }
            }
          },
        ]
      }
    ],
  };
}