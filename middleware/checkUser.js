var jwt = require('jsonwebtoken');
const { User } = require('../model');

module.exports = {
    //=======================<middleware for api>================================================
    checkToken: function (req, res, next) {
        try {
            var token = req.headers['authorization'];
            if (!token) {
                return res.status(200).send({ sucess: false, message: "Invalid Request" });
            }
            var data = jwt.verify(token, process.env.KEY);
            if (data) {
                User.findById({ _id: data._id }).then((result) => {
                    if (result) {
                        req.id = data._id
                        next();
                    }
                }).catch((err) => {
                    res.status(500).send({ success: false, message: "Unable to authenticate request" });
                });

            } else {
                res.status(200).send({ sucess: false, message: "Token invalid" });
            }
        } catch (error) {
            res.status(500).send({ success: false, message: 'Unable to authenticate request' });
        }
    },
    //======================<middleware for views>===========================================

    checkRoute: function (req, res, next) {
        try {
            // console.log('cookies ', req.cookies)
            var token = req.cookies.token;
            if (!token) {
                return res.render('signin');
            }
            var data = jwt.verify(token, process.env.KEY);
            if (data) {
                User.findById({ _id: data._id }).then((result) => {
                    if (result) {
                        req.id = data._id
                        next();
                    }
                }).catch((err) => {
                    res.render('signin');
                });
            } else {
                res.render('signin');
            }
        } catch (error) {
            res.render('signin');
        }
    },
    //=========================================<middleware for ether>=================================================
    checkAddress: function (req, res, next) {
        try {
            req.checkBody({
                'from': {
                    notEmpty: true,
                    errorMessage: 'Sender Address missing'
                },
                'index': {
                    notEmpty: true,
                    isInt: true,
                    errorMessage: 'Index Parameter Missing or value is in integer only'
                },
                'to': {
                    notEmpty: true,
                    errorMessage: 'Receiver Address Missing'
                },
                'amount': {
                    notEmpty: true,
                    isFloat: true,
                    errorMessage: 'Amount To Send Missing or amount is in float value'
                },
                'gasPrice': {
                    notEmpty: true,
                    isFloat: true,
                    errorMessage: 'gasPrice to Send Missing or gasprice is in float value '
                }
            });
            // console.log('validation check',req)                  //check request 
            var errors = req.validationErrors();
            if (errors) {
                var errorsMessage = [];
                errors.forEach(function (err) {
                    errorsMessage.push(err.msg);
                });
                return res.status(403).send({ success: false, message: errorsMessage[0] });
            } else {
                next()
            }
        } catch (error) {
            console.log('exception ', error)
            res.status(500).send({ success: false, message: 'Unable to authenticate request' });
        }
    }
}