const express = require('express');
const Weakness = require('../models/weakness');

const router = express.Router()

// Create a weakness - POST, weakness/add, newWeakness.Save()
router.post('/weakness/add', (req,res) => {
    const weaknessBody = req.body;
    let newWeakness = new Weakness(weaknessBody);
    newWeakness.save();
    res.json(newWeakness);
});

//View all the weaknesses- GET, weakness/all, weakness.find({})
router.get('/weakness/all', (req,res) => {
    res.json({"message" : `View all the weaknesses`})
});

 //Find a weakness - GET, /weakness/find/:weaknessId, weakness.find({id: weaknessId})
router.get('/weakness/find/:weaknessId', (req,res) => {
    res.json({"message" : `Find a weakness by Id: ${req.params.weaknessId}`})
});

//Update a weakness - POST/PUT, weakness/update/:weaknessId, Weakness.findOneAndUpdate({id: weaknessId})
router.post('/weakness/update/:weaknessId', (req,res) => {
    res.json({"message" : `Update weakness's information by Id: ${req.body}`})
});

//delete a weakness - POST/DELETE, /weakness/delete/:weaknessId, weakness.findOneAndUpdate({id: weaknessId})- deleted : true
router.post('/weakness/delete/:weaknessId', (req,res) => {
    res.json({"message" : `delete a weakness by Id: ${req.body.deleted}`})
});



module.exports = router;