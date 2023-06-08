const mongoose = require('mongoose');

const weaknessSchema = new mongoose.Schema({
    weaknessId : {type: String, required: true},
    name : {type: String, required: true},
    value : {type: Number, required: true},
    deleted: {type : Boolean, required: true}
});

let Weakness = mongoose.model('Weakness', weaknessSchema);

module.exports = Weakness;