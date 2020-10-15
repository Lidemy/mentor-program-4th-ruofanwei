/* eslint-disable no-shadow */
/* eslint-disable consistent-return */
/* eslint-disable */
const marked = require('marked');
const db = require('../models');

const { Article } = db;
const { User } = db;

const articleController = {
  // 發布
  add: (req, res) => {
    Article.findOne({
      where: {
        UserId: req.session.userId, // 身份驗證
      },
    }).then((article) => {
      res.render('article', {
        article,
      });
    });
  },
  handleAdd: (req, res, next) => {
    const { userId } = req.session;
    const { title } = req.body;
    const { content } = req.body;
    if (!userId || !content || !title) {
      res.redirect('article');
      return next();
    }
    // 新增
    Article.create({
      title,
      content,
      UserId: userId,
    }).then(() => {
      res.redirect('/');
    });
  },
  // 顯示
  index: (req, res) => {
    Article.findAll({
      include: User, // 要記得加上參數，把user include進來，才有使用者的資料
      order: [ // 新的文章顯示在最前面
        ['id', 'DESC'],
      ],
    }).then((articles) => {
      res.render('index', {
        articles,

      });
    });
  },
  /** 顯示單篇文章 */
  more: (req, res) => {
    Article.findOne({
      where: {
        id: req.params.id,
      },
    }).then((article) => {
      content = marked(article.content);
      res.render('completeArticle', {
        article,
      });
    });
  },
  handleMore: (req, res) => {
    Article.findOne({
      where: {
        id: req.params.id,
      },
    }).then((article) => {
      content = marked(article.content);
      res.render('completeArticle', {
        article,
      });
    });
  },
  delete: (req, res) => {
    Article.findOne({
      where: {
        id: req.params.id,
        UserId: req.session.userId, // 身份驗證
      },
    }).then((article) => article.destroy(), // 這邊之所以可以這樣return 是 promise的用法
    ).then(() => {
      res.redirect('/');
    }).catch(() => {
      res.redirect('/');
    });
  },
  update: (req, res) => {
    Article.findOne({
      where: {
        id: req.params.id,
      },
    }).then((article) => {
      res.render('update', {
        article,
      });
    });
  },
  handleUpdate: (req, res) => {
    // 做權限管理
    Article.findOne({
      where: {
        id: req.params.id,
        UserId: req.session.userId, // 身份驗證
      },
    }).then((article) => article.update({
      title: req.body.title,
      content: req.body.content,
    })).then(() => {
      res.redirect('/');
    }).catch(() => {
      res.redirect('/');
    });
  },
  about: (req, res) => {
    res.render('about');
  },
  note: (req, res) => {
    res.render('note');
  },
  moreNote: (req, res) => {
    res.render('moreNote');
  },
};
module.exports = articleController;
