/* eslint-disable no-shadow */
/* eslint-disable consistent-return */
/* eslint-disable */
const express = require('express');

const bodyParser = require('body-parser');
const session = require('express-session');
const flash = require('connect-flash');

// 引入
const app = express(); // 建立
const port = process.env.PORT || 5001;

const userController = require('./controllers/user');
const articleController = require('./controllers/article');

app.set('view engine', 'ejs');
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
}));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(flash());
app.use(express.static(`${__dirname}/public`));

app.use((req, res, next) => {
  // 用response.locals，放在這邊的東西可以直接被view存取，適合放一些全域的東西
  // 要拿時要用 request
  res.locals.username = req.session.username;
  res.locals.errorMessage = req.flash('errorMessage');
  next();
});

app.get('/', articleController.index);

function redirectBack(req, res) {
  res.redirect('back');
}

// 登入
app.get('/login', userController.login);
app.post('/login', userController.handleLogin, redirectBack);
// 登出
app.get('/logout', userController.logout);
// 註冊
app.get('/register', userController.register);
app.post('/register', userController.handleRegister, redirectBack);

// 發布
app.post('/article', articleController.handleAdd);
app.get('/article', articleController.add, redirectBack);
// 看更多內容
app.get('/more_content/:id', articleController.more);
app.post('/more_content/:id', articleController.handleMore);
// 刪除
app.get('/delete_articles/:id', articleController.delete);
// 更新
app.get('/update_articles/:id', articleController.update);
app.post('/update_articles/:id', articleController.handleUpdate);
// 關於我
app.get('/about', articleController.about);
// note
app.get('/note', articleController.note);
// moreNote
app.get('/moreNote', articleController.moreNote);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`);
});
