# Buttler
집사

## Philosophy
반복적인 일은 내가한다

## Feature
- 사내 근처의 한식뷔페인 이가네흑돼지의 오늘의 메뉴를 알려줍니다

## Environment
- [google cloud platform](https://console.cloud.google.com/apis/api/chat.googleapis.com/overview?hl=ko&orgonly=true&project=butler-316109&supportedpurview=organizationId)의 서비스 계정을 사용합니다
- chrome v91.0.4472.77(공식 빌드) (x86_64)
- nodejs v16.0.0
- npm v7.10.0
  - chromedriver v90.0.1
  - googleapis v75.0.0
  - selenium-webdriver v4.0.0-beta.3
  - unirest v0.6.0
  - node-schedule@2.0.0
  
## How to Run?
프로젝트 루트 경로에 config.js 파일이 있어야합니다
config.js는 아래와 같은 구성을 가지고 있어야합니다
```js
{
  "instagram_id": "your@email.com",
  "instagram_pw": "your password",
  "google_chat_general_room_id": "AAAAo2xiUnA",
  "google_chat_analytics_room_id": "AAAA5KKO5rs",
  "google_chat_launch_thread_id": "launchMenuNotification",
  "google_chat_launch_menu_icon": "https://w7.pngwing.com/pngs/462/874/png-transparent-instagram-logo-icon-instagram-icon-text-logo-sticker-thumbnail.png",
  "google_chat_launch_menu_noti_hour": 11,
  "google_chat_launch_menu_noti_minute": 30
}
```

```sh
$npm install

$npm start
```