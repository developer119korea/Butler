
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
