/* eslint-disable no-shadow */
/* eslint-disable consistent-return */
/* eslint-disable */
const db = require('../models');


const Prize = db.Prize
const User = db.User
const Menu = db.Menu
const Faq = db.Faq


function checkLogin(username, res) {
  if (!username) {
    return res.redirect('/login');
  }
}

const menuController = {
  // 常見問題頁面
  faq: (req, res) => {
   Faq.findAll({
      order: [ 
        ['num'],
      ],
    }).then((faqs) => {
      res.render('faq', {
        faqs,

      });
    });
  },
   
  // 管理問題
  manageFaq: (req, res) => {
  checkLogin(req.session.username, res);
    Faq.findAll({
      order: [ // 新的獎項顯示在最前面
        ['num'],
      ],
    }).then((faqs) => {
      res.render('manageFaq', {faqs});
    }).catch((err) => {
      console.log(err);
      return res.send('ooops')
    })
  },
  handleManageFaq:( req, res) => {
    Faq.findAll({
      order: [ 
        ['num'],
      ],
    }).then((faqs) => {
      res.render('manageFaq', {faqs});
    }).catch((err) => {
      console.log(err);
      return res.send('ooops')
    })
  },
  // 新增問題
  add: (req, res) => {
     checkLogin(req.session.username, res);
    return res.render('add_faq');
  },
  handleAdd: (req, res, next) => {
    const { num, question, answer } = req.body;
    if (num !== '' && question !== '' && answer !== '' ) {
       Faq.create({
        num,
        question,
        answer,
      }).then(() => {
        return res.redirect('/manageFaq');
      });
    }
  },
  // 刪除
  delete: (req, res) => {
    checkLogin(req.session.username, res);
    Faq.findOne({
      where: {
        id: req.params.id,
      },
    }).then((faq) => faq.destroy(), // 這邊之所以可以這樣return 是 promise的用法
    ).then(() => {
      res.redirect('/manageFaq');
    }).catch(() => {
      res.redirect('/manageFaq');
    });
  },
  // 編輯
  update: (req, res) => {
  checkLogin(req.session.username, res);
    Faq.findOne({
      where: {
        id: req.params.id,
       
      },
    }).then((faq) => {
      res.render('updateFaq', {
        faq,
      });
    });
  },
  handleUpdate: (req, res, next) => {
  checkLogin(req.session.username, res);
   const { num, question, answer } = req.body;
   if (!num || !question || !answer){
    req.flash('errorMessage', '❗ 每個欄位都要確實填喔 ( ๑‾̀◡‾́)σ» ❗')
    return next()
  }
    Faq.findOne({
      where: {
        id: req.params.id,
      },
    }).then((faq) => faq.update({
      num: req.body.num,
      question: req.body.question,
      answer: req.body.answer,
    })).then(() => {
      res.redirect('/manageFaq');
    }).catch(err => {
    req.flash('manageFaq', err.toString())
      return next()
  })
},
}
module.exports = menuController;
