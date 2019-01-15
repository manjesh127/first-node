const { User } = require('../model');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const saltRounds = 10;

module.exports = {
    //================>signup api<===================================
    SignUp: function (req, res) {
        try {
            var isMatched = bcrypt.hashSync(req.body.password, saltRounds);
            var user = new User({
                name: req.body.name,
                email: req.body.email,
                password: isMatched
            });
            user.save().then((result) => {
                if (result) {
                    res.status(200).send({ success: true, message: 'User Signup successfully' });
                }
            }).catch((err) => {
                res.status(500).send({ success: false, message: 'Internal Server Error' });
            });
        } catch (error) {
            res.status(500).send({ success: false, message: 'Internal Server Error' });
        }
    },
    //========================>signin api<===========================================
    SignIn: function (req, res) {
        try {
            User.findOne({ email: req.body.email }).then((user) => {
                if (user == null) {
                    return res.status(200).send({
                        success: false, message: 'User not found. Please signup.'
                    });
                }
                var isMatched = bcrypt.compareSync(req.body.password, user.password)
                if (!isMatched) {
                    return res.status(200).send({ success: false, message: "Invalid Credentials" });
                }
                const Token = jwt.sign({ email: user.email, _id: user._id }, process.env.KEY);
                res.status(200).send({ success: true, message: 'Login Sucessful', token: Token });
            }).catch((err) => {
                res.status(500).send({ success: false, message: 'Internal Server Error' });
            });
        } catch (error) {
            res.status(500).send({ success: false, message: 'Internal Server Error' });
            console.log('2nd catch', error);
        }
    },

    //==============================<fgot password api>====================================
    FgotPassword: function (req, res) {
        try {
            User.findOne({ _id: req.id }).then((user) => {
                if (user == null) {
                    return res.status(200).send({
                        success: false, message: 'User Not Found'
                    });
                }
                var isMatched = bcrypt.compareSync(req.body.oldPassword, user.password)
                if (!isMatched) {
                    return res.status(200).send({
                        success: false, message: "Old Password is Not Correct"
                    });
                }
                var hashPass = bcrypt.hashSync(req.body.newPassword, saltRounds);
                User.findOneAndUpdate({ _id: req.id },
                    { $set: { password: hashPass } }, { new: true }).then((result) => {
                        if (result) {
                            res.status(200).send({ sucess: true, message: 'Password Change successfully' });
                        }
                    }).catch((err) => {
                        res.status(500).send({ success: false, message: 'Internal Server Error' });
                    });
            }).catch((err) => {
                res.status(500).send({ success: false, message: 'Internal Server Error' });
            });
        } catch (error) {
            res.status(500).send({ success: false, message: 'Internal Server Error' });
        }
    },
}