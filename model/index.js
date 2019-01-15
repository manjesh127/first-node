const { User } = require('./schema/UserModel');
const{credential}=require('./schema/masterkey');
const{address}=require('./schema/addressModel')

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const options = {
    useNewUrlParser: true
}

mongoose.connect(process.env.MONGO_URI, options);

module.exports = { User, credential,address}