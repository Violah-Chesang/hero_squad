const mongoose = require('mongoose');

const strengthSchema = new mongoose.Schema({
    strengthId : {type: String, required: true},
    name : {type: String, required: true},
    value : {type: Number, required: true}
});

let Strength = mongoose.model('Strength', strengthSchema);

module.exports = Strength;