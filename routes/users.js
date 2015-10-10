var express = require('express');
var router = express.Router();

router.get('/register', function (req, res, next){
  res.render('users/register', {  title: 'Create an account'})
})

router.get('/login', function (req, res, next){
  res.render('users/login', { title: 'Login'})
})

router.post('/register', function (req, res, next){
  
})

module.exports = router;