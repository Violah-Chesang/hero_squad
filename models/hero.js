let mongoose = require('mongoose');

let heroSchema = new mongoose.Schema({
    heroId: {type : String, required: true},
    name: {type: String, required: true},
	age: {type: Number, required: true},
	strength: {type: String}, //StrengthId from Strength module
	weakness: {type: String}, //weaknessId from Weakness module
    deleted : {type : Boolean, default: false},
	assigned: {type: Boolean, default: false},
	squadId : {type: String},
    weaknessId : {type: String}

});

let Hero = mongoose.model('Hero', heroSchema);

module.exports = Hero;