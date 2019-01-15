const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const masterSchema = new Schema({
    ethAddress: { type: String },
    btcAddress: { type: String },
    index: { type: Number }
});

var address = mongoose.model('address', masterSchema);

module.exports = { address }