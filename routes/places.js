var express = require('express');
var router = express.Router();
var db = require('monk')('localhost/places-traveled')
var Users = db.get('users')
var Places = db.get('places')
var unirest = require('unirest');

router.get('/', function (req, res, next){
  Places.find({}, function (err, places){
    var username = req.session.user
    res.render('users/places', {  title: "Places I've Been", 
                                  user: username
                                })
  })
})

router.get('/data', function (req, res, next){
  Places.find({}, function (err, places){
    res.json(places)
  })
})

router.post('/', function (req, res, next){
  if (!req.body.latitude && !req.body.longitude){
    unirest.get('http://maps.googleapis.com/maps/api/geocode/json?address=' + req.body.address)
      .end(function (response){
        var lat = response.body.results[0].geometry.location.lat
        var lon = response.body.results[0].geometry.location.lng
        Places.insert({ address: req.body.address,
                        longitude: lon,
                        latitude: lat
                      }, function (err, place){
          res.json(place);
        })
      })
  }else {
    Places.insert(req.body, function (err, place){
      console.log('Successful Post')
      res.json(place)
    })
  }
})

module.exports = router;