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

const faqController = require('./controllers/faq');
const prizeController = require('./controllers/prize');
const menuController = require('./controllers/menu');
const userController = require('./controllers/user');
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




function redirectBack(req, res) {
  res.redirect('back');
}


// 抽獎頁面
app.get('/', prizeController.index);
// 登入後頁面
app.get('/list', prizeController.list);
// 抽獎頁面
app.get('/restaurant', prizeController.restaurant);
// 常見問題
app.get('/faq', faqController.faq);
// 菜單
app.get('/menu', menuController.menu);

// 管理常見問題
app.get('/manageFaq', faqController.manageFaq);
app.post('/managefaq', faqController.handleManageFaq);
// 新增問題
app.get('/add_faq', faqController.add);
app.post('/add_faq', faqController.handleAdd);
// 刪除問題
app.get('/delete_faq/:id', faqController.delete);
// 編輯問題
app.get('/update_faq/:id', faqController.update);
app.post('/update_faq/:id', faqController.handleUpdate, redirectBack);

// 管理菜單
app.get('/manageMenu', menuController.manageMenu);
app.post('/manageMenu', menuController.handleManageMenu);


// 新增菜單
app.get('/add_menu', menuController.add);
app.post('/add_menu', menuController.handleAdd);
// 刪除菜單
app.get('/delete_menu/:id', menuController.delete);
// 編輯菜單
app.get('/update_menu/:id', menuController.update);
app.post('/update_menu/:id', menuController.handleUpdate, redirectBack);

// 登入
app.get('/login', userController.login);
app.post('/login', userController.handleLogin, redirectBack);
// 登出
app.get('/logout', userController.logout);
// 註冊
app.get('/register', userController.register);
app.post('/register', userController.handleRegister, redirectBack);

// 新增獎項
app.get('/add_prize', prizeController.add);
app.post('/add_prize', prizeController.handleAdd);
// 顯示
app.get('/backstage', prizeController.backstage);
app.post('/backstage', prizeController.handleBackstage, redirectBack);
// 刪除獎項
app.get('/delete_prize/:id', prizeController.delete);
// 編輯獎項
app.get('/update_prize/:id', prizeController.update);
app.post('/update_prize/:id', prizeController.handleUpdate, redirectBack);
// 抽獎
app.get('/getPrize', prizeController.getPrize);


app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`);
});
