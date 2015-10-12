var express = require('express');
var router = express.Router();
var db = require('monk')('localhost/places-traveled')
var Users = db.get('users')
var Places = db.get('places')

router.get('/', function (req, res, next){
  Places.find({}, function (err, places){
    var username = req.session.user
    res.render('users/places', {  title: "Places I've Been", 
                                  user: username,
                                  allPlaces: places
                                })

  })
})

router.get('/data', function (req, res, next){
  Places.find({}, function (err, places){
    res.json(places)
  })
})

router.post('/', function (req, res, next){
  Places.insert(req.body, function (err, place){
    console.log('Successful Post')
    res.json(place)
  })
})

module.exports = router;