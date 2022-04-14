var express = require('express');
var router = express.Router();
var userModel = require('../models/users')


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});


router.post('/sign-up', async function(req,res,next){

  var searchUser = await userModel.findOne({
    email: req.body.emailFromFront
  })
  
  if(!searchUser){
    var newUser = new userModel({
      username: req.body.usernameFromFront,
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
    name: req.body.nameFromFront,
    firstname: req.body.firstNameFromFront,
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
    res.render('/')
  }  
});
module.exports = router;
