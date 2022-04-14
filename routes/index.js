var express = require('express');
var router = express.Router();
var journeyModel = require('../models/journey')


var city = ["Paris","Marseille","Nantes","Lyon","Rennes","Melun","Bordeaux","Lille"]
var date = ["2018-11-20","2018-11-21","2018-11-22","2018-11-23","2018-11-24"]



/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('login');
});

router.get('/home', function(req, res, next) {
  res.render('home', { title: 'Express' });
});

router.get('/tickets', function(req,res,next){

  res.render('tickets');
});

router.get('/trips-list', async function(req,res,next){
  
  res.render('trips');
});

module.exports = router;
