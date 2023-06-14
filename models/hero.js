let mongoose = require('mongoose');

let heroSchema = new mongoose.Schema({
    heroId: {type : String},
    name: {type: String},
	age: {type: Number},
	strength: {type: String}, //StrengthId from Strength module
	weakness: {type: String}, //weaknessId from Weakness module
    deleted : {type : Boolean, default: false},
	assigned: {type: Boolean, default: false},
	squadId : {type: String}
});

let Hero = mongoose.model('Hero', heroSchema);

module.exports = Hero;