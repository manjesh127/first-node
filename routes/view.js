var express = require('express');
var router = express.Router();
const{checkRoute}=require('../middleware');

/* GET home page. */
//signup page
router.get('/', function (req, res, next) {
  res.render('signup', { title: 'Express' });
});
//login page
router.get('/home',function(req,res){
 res.render('signin');
});
//forgot password page
router.get('/password',checkRoute,function(req,res){
  res.render('forgotpassword');
});

module.exports = router;
