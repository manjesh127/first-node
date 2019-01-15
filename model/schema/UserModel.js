const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: { type: String, required: [true, "can't be blank"], trim: true },
    email: { type: String, required: [true, "can't be blank"], lowercase: true, unique: [true, "email allready exist"], trim: true },
    password: { type: String, required: [true, "can't be blank"], },
});

var User = mongoose.model('User', UserSchema);

module.exports = { User }










