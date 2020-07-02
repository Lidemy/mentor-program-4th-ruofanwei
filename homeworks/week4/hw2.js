// 顯示前 20 本書的資料、刪除、新增以及修改書本
// 串接API

// 引入了request的library
const request = require('request');

const apiUrl = 'https://lidemy-book-store.herokuapp.com';


if (process.argv[2] === 'list') {
  request(
    `${apiUrl}/books?_limit=20`,
    // eslint-disable-next-line
    (error, response, body) => {
      if (error) {
        console.log('讀取資料失敗', error);
      } else {
        const data = JSON.parse(body);
        for (let i = 0; i < data.length; i += 1) {
          console.log(`${data[i].id} ${data[i].name}`);
        }
        return true;
      }
    },
  );
}

if (process.argv[2] === 'read') {
  request(
    `${apiUrl}/books/${process.argv[3]}`,
    (error, response, body) => {
      if (error) {
        console.log('讀取資料失敗', error);
      } else {
        const data = JSON.parse(body);
        console.log(data);
      }
      return true;
    },
  );
}

if (process.argv[2] === 'delete') {
  request.delete(`${apiUrl}/books/${process.argv[3]}`, (error) => {
    if (error) {
      console.log('刪除失敗', error);
    } else {
      console.log('刪除成功!');
    }
    return true;
  });
}

if (process.argv[2] === 'create') {
  request.post(
    {
      url: `${apiUrl}/books`,
      form: {
        name: process.argv[3],
      },
    },
    (error) => {
      if (error) {
        console.log('新增失敗', error);
      } else {
        console.log('新增成功!');
      }
      return true;
    },
  );
}


if (process.argv[2] === 'update') {
  request.patch({
    url: `${apiUrl}/books/${process.argv[3]}`,
    form: {
      name: process.argv[4],
    },
  }, (error) => {
    if (error) {
      console.log('更新失敗', error);
    } else {
      console.log('更新成功!');
    }
    return true;
  });
}
