const mongoose = require('mongoose');

const strengthSchema = new mongoose.Schema({
    strengthId : {type: String},
    name : {type: String},
    value : {type: Number}
});

let Strength = mongoose.model('Strength', strengthSchema);

module.exports = Strength;