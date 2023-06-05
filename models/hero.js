let mongoose = require('mongoose');

let heroSchema = new mongoose.Schema({
    heroId: {type : String, required: true},
    name: {type: String, required: true},
	age: {type: Number, required: true},
	strength: {strengthId},
	weakness: {weaknessId},
	assigned: {type: Boolean, default: false},
	squadId : {type: String},
    weaknessId : {type: String}

});

let Hero = mongoose.model('Hero', heroSchema);

module.exports = Hero;