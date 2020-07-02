## 請以自己的話解釋 API 是什麼
API是方便溝通、交換資料的管道/介面。

舉例來說就像是：
自動販賣機上的按鈕/面板
我們可以在自動販賣機按下面板上的按鈕取得我們要的飲料
1. 飲料可以想像成我們想要的資料
2. 在面板按下按鈕可以想像成送出資料需求
3. 拿到飲料可以想像成取得資料


## 請找出三個課程沒教的 HTTP status code 並簡單介紹

| Status Code | 說明 |
|-----------|-------|
| 521 | Web Server Is Down 指目標伺服器掛了。HTTP 418 是 1998 年訂的愚人節笑話（收錄在 RFC 2324）|
| 418 | I’m a teapot：我是一個茶壺，不會泡咖啡。|
| 498 | Invalid Token。|

參考資料：
- 常見與不常見的 Http Status : https://noob.tw/http-status-code/


## 假設你現在是個餐廳平台，需要提供 API 給別人串接並提供基本的 CRUD 功能，包括：回傳所有餐廳資料、回傳單一餐廳資料、刪除餐廳、新增餐廳、更改餐廳，你的 API 會長什麼樣子？請提供一份 API 文件。

URL : https://api.lidemy

| 說明     | Method| 參數 | path       | 說明     | 範例      |
|--------|--------|------------|----------------------|----------------|-----|
| 取得部分餐廳數量 |GET| _limit:限制回傳資料數量 | /restaurant|選擇回傳餐廳資料的數量，使用參數，將回傳所有餐廳與其資料| /restaurant?limit=20|
| 獲取單一餐廳資料 | GET|id   |/restaurant/:id | 指定該 ID 餐廳並單回傳該餐廳的資料| /restaurant?id=10 |
| 新增餐廳 | POST | data | /restaurant/:data| 該物件中需要包含 Restaurant Name 與地址，ID 由後台自動生成| { Name : veganDay, Adress : Taichung }|
| 刪除餐廳   | DELETE   | id     | /restaurant/:id | 刪除指定 ID 的餐廳資訊 | /restaurant?id=9|
| 更改餐廳資訊   | PATCH   | id     | /restaurant/:id | 更新指定 ID 的餐廳資訊  | { Name : GoodDay, Adress : Taichung }|


Example Request
``` js
curl -H 'Accept: application/lidemy/restaurant.v3+json'
-H 'Restaurant-ID: q9dj3h0dn39'
-X GET 'https://api.lidemy/restaurant'
```

Example Response
``` js
{
   "_total": 250,
   "Id": "8dfafdbc3a40",
   "data": {
      "Name": "veganDay",
      "Adress": "Taichung",
      "phone": 8612345678,
      "email": "veganDay@gmail.com",
      "country": "taiwan",
      "description": "veganOnly",
    },
}
```
參考資料：
-  twitch api文件:https://dev.twitch.tv/docs/v5/reference/games

