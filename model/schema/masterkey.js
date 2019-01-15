const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const masterSchema = new Schema({
    masterPrivateKey: { type: String },
    nextChild: { type: Number, default: 0 }
});

var credential = mongoose.model('credential', masterSchema);

module.exports = { credential }