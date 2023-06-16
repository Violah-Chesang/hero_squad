let mongoose = require('mongoose');

let squadSchema = new mongoose.Schema({
    squadId: {type : String, required: true},
    name: {type: String, required: true},
	heroMaxNo: {type: Number, max : 5 ,required: true},
	cause: {type: String},
    deleted: {type: Boolean, default: false},
    score: {type: Number}
});

let Squad = mongoose.model('Squad', squadSchema);

module.exports = Squad;