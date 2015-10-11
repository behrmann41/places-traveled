var express = require('express');
var router = express.Router();
var db = require('monk')('localhost/places-traveled')
var Users = db.get('users')

router.get('/', function (req, res, next){
  var username = req.session.user
  res.render('users/places', {  title: "Places I've Been", user: username })
})

module.exports = router;