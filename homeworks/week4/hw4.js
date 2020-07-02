// 呼叫 Twitch API，並拿到「最受歡迎的遊戲列表（Get Top Games）」
// 依序印出目前觀看人數跟遊戲名稱

// 引入了request的library
const request = require('request');

// Twitch developer dashboard 註冊一個新的 Application 會拿到一個 ClientID
const clientID = 'br15dzlr0ukquy97xhv00y3i9r9g4x';
const baseUrl = 'https://api.twitch.tv/kraken';

request({
  method: 'GET',
  // 拿到「最受歡迎的遊戲列表（Get Top Games）」
  url: `${baseUrl}/games/top`,
  headers: {
    'Client-ID': clientID,
    // eslint-disable-next-line
    'Accept': 'application/vnd.twitchtv.v5+json',
  },
  // eslint-disable-next-line
}, (error, response, body) => {
  if (error) {
    return console.log(error);
  }
  // 用 JSON.parse處理JSON格式的字串
  const data = JSON.parse(body);
  const games = data.top;

  // ES6 語法 for...of
  // 可以把陣列的值一個個取出
  // eslint-disable-next-line
  for (const game of games) {
    // 用 . 來取得物件的資料
    // eslint-disable-next-line
    console.log(game.viewers + ' ' + game.game.name);
  }
});
