var express = require('express');
var router = express.Router();
var journeyModel = require('../models/journey')


var city = ["Paris","Marseille","Nantes","Lyon","Rennes","Melun","Bordeaux","Lille"]
var date = ["2018-11-20","2018-11-21","2018-11-22","2018-11-23","2018-11-24"]


/* GET home page. */
router.get('/', function(req, res, next) {
  if(req.session.dataCardTickets == undefined){
    req.session.dataCardTickets = []
  }
  
  res.render('login',{ userSess : req.session.user});
});

router.get('/home', function(req, res, next) {
  res.render('home', { userSess : req.session.user});
});

router.get('/tickets', function(req,res,next){
  console.log(req.session.dataCardTickets)
  var alreadyExist = false;

  for(var i = 0; i< req.session.dataCardTickets.length; i++){
    if(req.session.dataCardTickets[i].date == req.query.date && req.session.dataCardTickets[i].departure == req.query.departure && req.session.dataCardTickets[i].arrival == req.query.arrival){
      alreadyExist = true;
    }
  }

  if(alreadyExist != true){
  req.session.dataCardTickets.push(
      {
      departure: req.query.departure,
      arrival: req.query.arrival,
      date : req.query.date,
      departureTime :req.query.departureTime,
      price: req.query.price,
    })
    }
    console.log(req.session.dataCardTickets)

 

  res.render('tickets',{userSess : req.session.user,dataCardsTickets : req.session.dataCardTickets});
});

router.post('/trips-list', async function(req,res,next){
  if(req.body.departure && req.body.arrival && req.body.date){
  var list = await journeyModel.find({departure : req.body.departure,arrival : req.body.arrival, date : req.body.date})
  }else{
    res.redirect('/home')
  }
  console.log(list)
  res.render('trips',{userSess : req.session.user, list});
});

module.exports = router;
