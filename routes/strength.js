const express = require('express');
const Strength = require('../models/strength');

const router = express.Router()

// Create a strength - POST, strength/add, newStrength.Save()
router.post('/strength/add', (req,res) => {
    let newData = req.body;
    Strength.insertMany(newData);
    let newStrength = new Strength(newData);
    newStrength.save();
    res.json(newStrength);
});

//View all the strength- GET, strength/all, Strength.find({})
router.get('/strength/all',async (req,res) => {
    const allStrengths= await Strength.find({});
    res.json(allStrengths);
});

 //Find a strength - GET, /strength/find/:strengthId, Strength.find({id: strengthId})
router.get('/strength/find/:strengthId',async (req,res) => {
    const getId = req.params.strengthId;
    const id = await Strength.find({"strengthId": getId})
    res.json(id)
});

//Update a strength - POST/PUT, strength/update/:strengthId, Strength.findOneAndUpdate({id: strengthId})
router.post('/strength/update/:strengthId/:name',async (req,res) => {
    const filter = {"strengthId":req.params.strengthId};
    const update = {"name" : req.params.name};
    const options = {
        new : true
    }

    const updatedRecord = await Strength.findOneAndUpdate(filter, update, options);
    res.json(updatedRecord)
});

//delete a strength - POST/DELETE, /strength/delete/:strengthId, strength.findOneAndUpdate({id: strengthId})- deleted : true
router.post('/strength/delete/:strengthId', (req,res) => {
    res.json({"message" : `delete a strength by Id: ${req.body.deleted}`})
});



module.exports = router;