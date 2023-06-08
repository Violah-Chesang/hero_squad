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
router.get('/weakness/all',async (req,res) => {
    const allweaknesses= await Weakness.find({});
    res.json(allweaknesses);
});

 //Find a weakness - GET, /weakness/find/:weaknessId, weakness.find({id: weaknessId})
router.get('/weakness/find/:weaknessId',async (req,res) => {
    const getId = req.params.weaknessId;
    const id = await Weakness.find({"weaknessId": getId})
    res.json(id)
});

//Update a weakness - POST/PUT, weakness/update/:weaknessId, Weakness.findOneAndUpdate({id: weaknessId})
router.post('/weakness/update/:weaknessId/:name',async (req,res) => {
    const filter = {"weaknessId":req.params.weaknessId};
    const update = {"name" : req.params.name};
    const options = {
        new : true
    }

    const updatedRecord = await Weakness.findOneAndUpdate(filter, update, options);
    res.json(updatedRecord)
});

//delete a weakness - POST/DELETE, /weakness/delete/:weaknessId, weakness.findOneAndUpdate({id: weaknessId})- deleted : true
router.post('/weakness/delete/:weaknessId', (req,res) => {
    res.json({"message" : `delete a weakness by Id: ${req.body.deleted}`})
});



module.exports = router;