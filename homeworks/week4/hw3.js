// 輸入國家的英文名字，就能夠查詢符合的國家的資訊
// 引入了request的library
const request = require('request');
// 讀取使用者下的參數
const args = process.argv;
const apiUrl = 'https://restcountries.eu/rest/v2';


const name = args[2];

// node hw3.js korea
// args[2] 需要是國家名稱
if (!name) {
  console.log('請輸入國家名稱');
}

// ES6 新語法 Template Literals：使用 ${ } 來加入變數或函式
// 使用 ${ apiUrl } 來插入變數
// eslint-disable-next-line
request(`${apiUrl}/name/${name}`, (error, response, body) => {
  if (error) {
    return console.log('讀取資料失敗', error);
  }
  // 用 JSON.parse處理JSON格式的字串
  // eslint-disable-next-line
  let data = JSON.parse(body);

  // status 請求回應狀態，也就是 HTTP 狀態碼（status code）
  // 4xx：客戶端錯誤 表示客戶端提交的請求中有錯誤或者不能被完成
  if (data.status >= 400 && data.status < 500) {
    return console.log('找不到國家資訊');
  }
  for (let i = 0; i < data.length; i += 1) {
    console.log('========================');

    // ES6 新語法 Template Literals：使用 ${ } 來加入變數或函式
    // 使用 ${ data[i].id } 來插入變數
    console.log(`國家: ${data[i].name}`);
    console.log(`首都: ${data[i].capital}`);
    console.log(`貨幣: ${data[i].currencies[0].code}`);
    console.log(`國碼: ${data[i].callingCodes[0]}`);
  }
});
