/* eslint-disable no-shadow */
/* eslint-disable consistent-return */
/* eslint-disable */
const bcrypt = require('bcrypt')
const saltRounds = 10
const db = require('../models')
const User = db.User

const userController = {
 
 login: (req, res) => {
  res.render('user/login')
 },
 handleLogin: (req, res, next) => {
  // 先把資料取出來
  const {username, password} = req.body
  if (!username || !password){
    req.flash('errorMessage', '❗ 每個欄位都要填喔 ( ๑‾̀◡‾́)σ» ❗')
    return next()
  }

  User.findOne({
    where:{
      username
    }
  }).then(user => {
    if(!user){
      req.flash('errorMessage', 'user is not exist')
      return next()
    }

     bcrypt.compare(password, user.password, function(err,isSuccess){
      if (err || !isSuccess){
        req.flash('errorMessage', '密碼錯誤')
        return next()
      }
      req.session.username = user.username
      res.redirect('/list')
    })
  }).catch(err => {
    req.flash('errorMessage', err.toString())
      return next()
  })

  },
  register: (req, res) => {
    res.render('user/register')
  },
  handleRegister: (req, res, next) => {
    // 用ES6的解構語法把東西拿出來
    const {username, password} = req.body
    // 先做檢查，如果沒有撈到資料
    if(!username || !password){
      req.flash('errorMessage', '❗ 每個欄位都要填喔 ( ๑‾̀◡‾́)σ» ❗')
      return next()
    }
    
    // 請 bcrypt 幫我把 password 做hash後 產生的密碼，我再寫進去
    bcrypt.hash(password, saltRounds, function(error, hash){
      if(error){
        req.flash('errorMessage', error.toString())
        return next()
      }

      User.create({
        username,
        password:hash
      }).then(user => {
        req.session.username = username
        req.session.userId = user.id
        res.redirect('list')
      }).catch(error => {
        req.flash('errorMessage', error.toString())
          return next()
      })
      })
  },
  logout: (req, res) => {
    req.session.username = null
    res.redirect('/login')
  }
}
module.exports = userController;
