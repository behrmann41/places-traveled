var express = require('express');
var router = express.Router();
var db = require('monk')('localhost/places-traveled')
var Users = db.get('users')
var bcrypt = require('bcrypt')



router.get('/register', function (req, res, next){
  res.render('users/register', {  title: 'Create an account'})
})

router.post('/register', function (req, res, next){
  var errors = [];
  var hash = bcrypt.hashSync(req.body.password, 10)
  if (req.body.password.length < 8 ){
    errors.push('Your password needs to be at least 8 characters');
  }
  if (req.body.password === 'password'){
    errors.push('Your password cannot be password');
  }
  if (req.body.password !== req.body.pwconfirm){
    errors.push('Your passwords did not match')
  }
  if (errors.length){
    res.render('users/register', {  title: 'Create an account', errors: errors})
  } else {
    Users.find({  email: req.body.email }, function (err, user){
      if (user.length > 0){
        errors.push('Email already in use');
        res.render('users/register', {  title: 'Create an account', errors: errors})
      } else {
        Users.insert({  username: req.body.username,
                        email: req.body.email,
                        passwordDigest: hash
                    })
        req.session.user = req.body.username
        res.redirect('/places')
      }
    })
  }
})

router.get('/login', function (req, res, next){
  res.render('users/login', { title: 'Login'})
})

router.post('/login', function (req, res, next){
  var errors = [];
  Users.findOne({ email: req.body.email }, function (err, user){
    if (user){
      if (bcrypt.compareSync(req.body.password, user.passwordDigest)){
        req.session.user = user.username
        res.redirect('/places')
      } else {
        errors.push('Invalid Email / Password')
        res.render('users/login', {  title: 'Login', errors: errors})
      }
    } else {
      errors.push('Invalid Email / Password')
      res.render('users/login', {  title: 'Login', errors: errors})
    }
  })
})

router.get('/logout', function (req, res, next){
  req.session = null
  res.redirect('/')
})

module.exports = router;