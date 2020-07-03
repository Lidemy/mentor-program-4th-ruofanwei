// 顯示前 20 本書的資料、刪除、新增以及修改書本
// 串接API

// 引入了request的library
const request = require('request');

// 讀取使用者下的參數
const args = process.argv;
const apiUrl = 'https://lidemy-book-store.herokuapp.com';
const action = args[2];
const params = args[3];

// ES6 新語法 Template Literals：使用 ${ } 來加入變數或函式
// 使用 ${ apiUrl } 來插入變數
function listBooks() {
  // eslint-disable-next-line consistent-return
  request(`${apiUrl}/books?_limit=20`, (error, response, body) => {
    if (error) {
      // eslint-disable-next-line no-console
      return console.log('讀取資料失敗', error);
    }
    const data = JSON.parse(body);
    for (let i = 0; i < data.length; i += 1) {
      // eslint-disable-next-line no-console
      console.log(`${data[i].id} ${data[i].name}`);
    }
  });
}

function readBook(id) {
  // eslint-disable-next-line consistent-return
  request(`${apiUrl}/books/${id}`, (error, response, body) => {
    if (error) {
      // eslint-disable-next-line no-console
      return console.log('讀取資料失敗', error);
    }
    const data = JSON.parse(body);
    // eslint-disable-next-line no-console
    console.log(data);
  });
}

function deleteBook(id) {
  // eslint-disable-next-line consistent-return
  request.delete(`${apiUrl}/books/${id}`, (error) => {
    if (error) {
      // eslint-disable-next-line no-console
      return console.log('刪除失敗', error);
    }
    // eslint-disable-next-line no-console
    console.log('刪除成功!');
  });
}

function createBook(name) {
  request.post({
    url: `${apiUrl}/books`,
    form: {
      name,
    },
    // eslint-disable-next-line consistent-return
  }, (error) => {
    if (error) {
      // eslint-disable-next-line no-console
      return console.log('新增失敗', error);
    }
    // eslint-disable-next-line no-console
    console.log('新增成功!');
  });
}

function updateBook(id, name) {
  request.patch({
    url: `${apiUrl}/books/${id}`,
    form: {
      name,
    },
    // eslint-disable-next-line consistent-return
  }, (error) => {
    if (error) {
      // eslint-disable-next-line no-console
      return console.log('更新失敗', error);
    }
    // eslint-disable-next-line no-console
    console.log('更新成功!');
  });
}
// switch 語法
// 變數的值是 list，則會執行 case 'list': listBooks();區塊的程式碼
switch (action) {
  case 'list':
    listBooks();
    break;
  case 'read':
    readBook(params);
    break;
  case 'delete':
    deleteBook(params);
    break;
  case 'create':
    createBook(params);
    break;
  case 'update':
    updateBook(params, args[4]);
    break;
  default:
    // eslint-disable-next-line no-console
    console.log('Available commands: list, read, delete, create and update');
}
