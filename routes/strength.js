const express = require('express');
const Strength = require('../models/strength');

const router = express.Router()

// Create a strength - POST, strength/add, newStrength.Save()
router.post('/strength/add', (req,res) => {
    res.json({"message" : `Add a new strength`});
});

//View all the strength- GET, strength/all, Strength.find({})
router.get('/strength/all', (req,res) => {
    res.json({"message" : `View all the strengths`})
});

 //Find a strength - GET, /strength/find/:strengthId, Strength.find({id: strengthId})
router.get('/strength/find/:strengthId', (req,res) => {
    res.json({"message" : `Find a strength by Id: ${req.params.strengthId}`})
});

//Update a strength - POST/PUT, strength/update/:strengthId, Strength.findOneAndUpdate({id: strengthId})
router.post('/strength/update/:strengthId', (req,res) => {
    res.json({"message" : `Update strength's information by Id: ${req.body}`})
});

//delete a strength - POST/DELETE, /strength/delete/:strengthId, strength.findOneAndUpdate({id: strengthId})- deleted : true
router.post('/strength/delete/:strengthId', (req,res) => {
    res.json({"message" : `delete a strength by Id: ${req.body.deleted}`})
});



module.exports = router;