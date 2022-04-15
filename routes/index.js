var express = require('express');
var router = express.Router();
var journeyModel = require('../models/journey')
var userModel = require('../models/users')




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
  if(req.session.user != undefined){
    res.render('home', { userSess : req.session.user});
  }else{
    res.redirect('/')
  }
});

router.get('/tickets', function(req,res,next){
  if(req.session.user != undefined){
  console.log(req.session.dataCardTickets)
  var alreadyExist = false;

  for(var i = 0; i< req.session.dataCardTickets.length; i++){
    if(req.session.dataCardTickets[i].date == req.query.date && req.session.dataCardTickets[i].departure == req.query.departure && req.session.dataCardTickets[i].arrival == req.query.arrival && req.session.dataCardTickets[i].price == req.query.price && req.session.dataCardTickets[i].departureTime == req.query.departureTime){
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
  }else {
    res.redirect('/')
  }

  if(alreadyExist != true && req.session.dataCardTickets != undefined){
  req.session.dataCardTickets.push(
      {
      departure: req.query.departure,
      arrival: req.query.arrival,
      date : req.query.date,
      departureTime :req.query.departureTime,
      price: req.query.price, 
  })
    }else if (req.session.dataCardTickets == undefined){
    }
    console.log(req.session.dataCardTickets)

 
});

router.get('/confirm', async function(req, res, next) {

  var dataCardsTickets = req.session.dataCardTickets;
  var userSess = req.session.user;
  var foundUser = await userModel.findOne({_id: userSess.id});
  console.log(foundUser)

  for(var i = 0; i< dataCardsTickets.length; i++){
    foundUser.last_trips.push({
                    departure: dataCardsTickets[i].departure,
                    arrival: dataCardsTickets[i].arrival,
                    date: dataCardsTickets[i].date, 
                    departureTime: dataCardsTickets[i].departureTime, 
                    price: dataCardsTickets[i].price})
    await foundUser.save();
  }
  console.log(foundUser)
});

router.post('/trips-list', async function(req,res,next){
  if(req.session.user != undefined){
    var list = await journeyModel.find({departure : req.body.departure,arrival : req.body.arrival, date : req.body.date})

    if(req.body.departure && req.body.arrival && req.body.date){
      var list = await journeyModel.find({departure : req.body.departure,arrival : req.body.arrival, date : req.body.date})
      if(list.length != 0){
        res.render('trips',{userSess : req.session.user, list});
      }else{
        res.redirect('/erreur')
      }
    }else{
      res.redirect('/home')
    }
  
    console.log(list.length)
  }else{
    res.redirect('/')
  }
 
});

router.get('/trips-list', function(req, res, next) {
  if (req.session.user != undefined){
    res.redirect('/home')
  }else{
    res.redirect('/')
  }
});


router.get('/erreur', function(req, res, next) {
  if(req.session.user != undefined){
    console.log(req.session.user)
    res.render('erreur',{ userSess : req.session.user});
  }else{
    res.redirect('/')
  }
  
});

module.exports = router;
