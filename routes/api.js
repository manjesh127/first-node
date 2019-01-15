var express = require('express');
var router = express.Router();
var { checkToken,checkAddress } = require('../middleware');

var UserDetail = require('../api/userdetail');     //for user detail api
var Blockchain = require('../ethereaum/send');     //for block chain api

/* GET users listing. */
router.post('/signup', UserDetail.SignUp);
router.post('/signin', UserDetail.SignIn);
router.post('/password', checkToken, UserDetail.FgotPassword);

router.post('/ether', Blockchain.Wallet)
router.post('/privateKey', Blockchain.privatekey);

router.post('/snedEther',checkAddress,Blockchain.sendEther);


module.exports = router;
