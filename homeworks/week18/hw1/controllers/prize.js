
/* eslint-disable no-shadow */
/* eslint-disable consistent-return */
/* eslint-disable */const db = require('../models');
const { Op } = require('sequelize');

const Prize = db.Prize
const User = db.User


function checkLogin(username, res) {
  if (!username) {
    return res.redirect('/login');
  }
}

const prizeController = {
  //登入後頁面
  list: (req, res) => {
    res.render('list');
  },
  
  //抽獎頁面
  index: (req, res) => {
    Prize.findAll({
      order: [ 
        ['weight'],
      ],
    }).then((prizes) => {
      res.render('index', {
        prizes,

      });
    });
  },
  // 餐廳首頁
  restaurant: (req, res) => {
    res.render('restaurant');
  },
  
  
  // 新增獎項
  add: (req, res) => {
     checkLogin(req.session.username, res);
    return res.render('add_prize');
  },
  handleAdd: (req, res, next) => {
    const { name, content, img, weight } = req.body;
    if (name !== '' && content !== '' && img !== '' && weight !== '') {
       Prize.create({
        name,
        content,
        img,
        weight,
      }).then(() => {
        return res.redirect('/backstage');
      });
    }
  },
  // 後台
  backstage: (req, res) => {
    Prize.findAll({
      include: User, // 要記得加上參數，把user include進來，才有使用者的資料
      order: [ // 新的獎項顯示在最前面
        ['weight'],
      ],
    }).then((prizes) => {
      res.render('backstage', {prizes});
    }).catch((err) => {
      console.log(err);
      return res.send('ooops')
    })
  },
  handleBackstage: (req, res) => {
    checkLogin(req.session.username, res);
    Prize.findAll({
      order: [ // 新的獎項顯示在最前面
        ['weight'],
      ],
    }).then((prizes) => {
      res.render('backstage', {prizes});
    }).catch((err) => {
      console.log(err);
      return res.send('ooops')
    })
  },

  // 刪除獎項
  delete: (req, res) => {
    checkLogin(req.session.username, res);
    Prize.findOne({
      where: {
        id: req.params.id,
      },
    }).then((prize) => prize.destroy(), // 這邊之所以可以這樣return 是 promise的用法
    ).then(() => {
      res.redirect('/backstage');
    }).catch(() => {
      res.redirect('/backstage');
    });
  },
  // 編輯獎項
  update: (req, res) => {
  checkLogin(req.session.username, res);
    Prize.findOne({
      where: {
        id: req.params.id,
       
      },
    }).then((prize) => {
      res.render('update', {
        prize,
      });
    });
  },
  handleUpdate: (req, res, next) => {
  checkLogin(req.session.username, res);
   const {userId} = req.session
   const { name, content, img, weight } = req.body;
   if (!name || !content || !img || !weight){
    req.flash('errorMessage', '❗ 每個欄位都要確實填喔 ( ๑‾̀◡‾́)σ» ❗')
    return next()
  }
    Prize.findOne({
      where: {
        id: req.params.id,
      },
    }).then((prize) => prize.update({
      name: req.body.name,
      content: req.body.content,
      img: req.body.img,
      weight: req.body.weight,
    })).then(() => {
      res.redirect('/backstage');
    }).catch(err => {
    req.flash('errorMessage', err.toString())
      return next()
  })
},
getPrize: (req, res) => {
  Prize.findAll().then((prizes) => {
      const weights = [];
      for (const prize of prizes) {
        weights.push(prize.weight);
     }

const random = Math.floor(Math.random() * 100); 
console.log("random:", random)
let concatWeightArr = weights.concat(random);    //將隨機數加入權重陣列
console.log("concatWeightArr:", concatWeightArr)
let sortedWeightArr = concatWeightArr.sort(function(a, b){return a-b;});    //將包含隨機數的新權重陣列按從小到大（升序）排序
console.log("sortedWeightArr:", sortedWeightArr)
let randomIndex = sortedWeightArr.indexOf(random);    //索引隨機數在新權重陣列中的位置
console.log("randomIndex:", randomIndex)
randomIndex = Math.min(randomIndex, prizes.length+1);    //權重隨機數的下標不得超過獎項陣列的長度-1，重新計算隨機數在獎項陣列中的索引位置                
console.log("randomIndex:", randomIndex)

let result = {};
  Prize.findOne({
        where: {
          id: randomIndex,
        },
      }).then((prize) => {
        console.log(prize.name, prize.weight);
          result = {
            name: prize.name,
            content: prize.content,
            img: prize.img,
          };
           return res.status(200).json(result);
        }).catch(err => console.log(err));
    });
}
};
module.exports = prizeController;
