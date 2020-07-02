// hw1：來自秋秋鞋的任務
// 串接API
// 用 node.js 寫出一個程式，執行後會在 console 列出前十本書籍的 id 以及書名
// 引入了request的library
const request = require('request');
// 抓取 url 的內容
request(
  'https://lidemy-book-store.herokuapp.com/books?_limit=10',
  (error, reponse, body) => {
    let data;
    try {
      data = JSON.parse(body); // 用 JSON.parse處理JSON格式的字串
    } catch (e) {
      console.log('e');
    }
    for (let i = 0; i < data.length; i += 1) {
    // ES6 新語法 Template Literals：使用 ${ } 來加入變數或函式
    // 使用 ${ data[i].id } 來插入變數
      console.log(`${data[i].id} ${data[i].name}`);
    }
  },
);
