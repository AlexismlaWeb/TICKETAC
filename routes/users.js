var express = require('express');
var router = express.Router();
var userModel = require('../models/users')


/* GET users listing. */
router.get('/', function(req, res, next) {
  console.log(req.session.user)
  res.send('/',{ userSess : req.session.user});
});


router.post('/sign-up', async function(req,res,next){

  var searchUser = await userModel.findOne({
    email: req.body.emailFromFront
  })
  
  if(!searchUser){
    var newUser = new userModel({
      name: req.body.nameFromFront,
      firstname: req.body.firstNameFromFront,
      email: req.body.emailFromFront,
      password: req.body.passwordFromFront,
    })
  
    var newUserSave = await newUser.save();
  
    req.session.user = {
      email : newUserSave.email,
      id: newUserSave._id,
    }
  
    console.log(req.session.user)
  
    res.redirect('/home')
  } else {
    res.redirect('/')
  }
  
});

router.post('/sign-in', async function(req,res,next){

  var searchUser = await userModel.findOne({
    email: req.body.emailFromFront,
    password: req.body.passwordFromFront
  })

  if(searchUser!= null){
    req.session.user = {
      email : searchUser.email,
      id: searchUser._id
    }
    res.redirect('/home')
  } else {
    res.redirect('/')
  }  
});

router.get('/logout', function(req,res,next){

  req.session.user = null;

  res.redirect('/')
});
module.exports = router;
