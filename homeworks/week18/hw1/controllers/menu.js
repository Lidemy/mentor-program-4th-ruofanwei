/* eslint-disable no-shadow */
/* eslint-disable consistent-return */
/* eslint-disable */
const db = require('../models');


const Prize = db.Prize
const User = db.User
const Menu = db.Menu


function checkLogin(username, res) {
  if (!username) {
    return res.redirect('/login');
  }
}

const menuController = {
   // 菜單
  menu: (req, res) => {
    Menu.findAll({
      order: [ 
        ['id'],
      ],
    }).then((menus) => {
      res.render('menu', {
        menus,

      });
    });
  },
  // 管理菜單
  manageMenu: (req, res) => {
  checkLogin(req.session.username, res);
    Menu.findAll({
      order: [ // 新的獎項顯示在最前面
        ['id'],
      ],
    }).then((menus) => {
      res.render('manageMenu', {menus});
    }).catch((err) => {
      console.log(err);
      return res.send('ooops')
    })
  },
  handleManageMenu:( req, res) => {
    Menu.findAll({
      order: [ 
        ['id'],
      ],
    }).then((menus) => {
      res.render('manageMenu', {menus});
    }).catch((err) => {
      console.log(err);
      return res.send('ooops')
    })
  },
  // 新增菜單
  add: (req, res) => {
     checkLogin(req.session.username, res);
    return res.render('add_menu');
  },
  handleAdd: (req, res, next) => {
    const { name, price, img } = req.body;
    if (name !== '' && price !== '' && img !== '' ) {
       Menu.create({
        name,
        price,
        img,
      }).then(() => {
        return res.redirect('/manageMenu');
      });
    }
  },
  // 刪除菜單
  delete: (req, res) => {
    checkLogin(req.session.username, res);
    Menu.findOne({
      where: {
        id: req.params.id,
      },
    }).then((menu) => menu.destroy(), // 這邊之所以可以這樣return 是 promise的用法
    ).then(() => {
      res.redirect('/manageMenu');
    }).catch(() => {
      res.redirect('/manageMenu');
    });
  },
  // 編輯菜單
  update: (req, res) => {
  checkLogin(req.session.username, res);
    Menu.findOne({
      where: {
        id: req.params.id,
       
      },
    }).then((menu) => {
      res.render('updateMenu', {
        menu,
      });
    });
  },
  handleUpdate: (req, res, next) => {
  checkLogin(req.session.username, res);
   const { name, price, img } = req.body;
   if (!name || !price || !img){
    req.flash('errorMessage', '❗ 每個欄位都要確實填喔 ( ๑‾̀◡‾́)σ» ❗')
    return next()
  }
    Menu.findOne({
      where: {
        id: req.params.id,
      },
    }).then((menu) => menu.update({
      name: req.body.name,
      price: req.body.price,
      img: req.body.img,
    })).then(() => {
      res.redirect('/manageMenu');
    }).catch(err => {
    req.flash('manageMenu', err.toString())
      return next()
  })
},
}
module.exports = menuController;
