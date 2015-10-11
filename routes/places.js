var express = require('express');
var router = express.Router();
var db = require('monk')('localhost/places-traveled')
var Users = db.get('users')
var Places = db.get('places')

router.get('/', function (req, res, next){
  Places.find({}, function (err, places){
    var username = req.session.user
    res.render('users/places', {  title: "Places I've Been", user: username })
  })
})

router.post('/', function (req, res, next){
  Places.insert({}, function (err, place){
    console.log(place)
  })
})

module.exports = router;