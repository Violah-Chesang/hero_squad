const express = require('express');
const Squad = require('../models/squad');
const Hero = require('../models/hero');

const router = express.Router();

// Create a Squad - POST, squad/add, newSquad.Save()
router.post('/squad/add', (req,res) => {
   const squadBody = req.body;

   const newSquad = new Squad(squadBody);
    newSquad.save();
   res.json(newSquad);
});

//View all the squads- GET, squad/all, Squad.find({})
router.get('/squad/all',async (req,res) => {
    const allSquads = await Squad.find({});
    res.json(allSquads);
});

 //Find a squad - GET, squad/find/:squadId, Squad.find({id: squadId})
 router.get('/squad/find/:squadId',async (req,res) => {
    const squadById = await Squad.find({"squadId": req.params.squadId});
    res.json(squadById);
});


//Update a squad - POST/PUT, squad/update/:squadId, Squad.findOneAndUpdate({id: squadId})
router.post('/squad/update/:squadId/:cause',async (req,res) => {
    const filter = {"squadId" : req.params.squadId};
    const update = {"cause": req.params.cause};
    const options = { new : true};

    const updatedSquad =  await Squad.findOneAndUpdate(filter,update,options);

    res.json(updatedSquad);
});

//delete a squad - POST/DELETE, squad/delete/:squadId, Squad.findOneAndUpdate({id: squadId})- deleted : true
router.post('/squad/delete/:squadId',async (req,res) => {
    const filter = {"squadId" : req.params.squadId};
    const update = {"deleted": true};

    const deletedSquad =  await Squad.findOneAndUpdate(filter,update);

    res.json({"message" : "Record deleted"});
});

 //Find a squad's characteristics - GET, squad/features/:squadId, squad.find({id: squadId})
 //we need: Id, name, cause, hero names , number of heroes
 router.get('/squad/features/:squadId',async (req,res) => {
    const squadFeatures =await Squad.find({"squadId": req.params.squadId});
    //hero names in this squad
    const heroes = await Hero.find({"name" : squadFeatures.name});
    // The length of the result will be he number of heroes
    const noOfHeroes = heroes.length;

    const features = {
        allFeatures : squadFeatures,
        heroNames : heroes,
        heroNumber : noOfHeroes
    }

    res.json(features);
});

module.exports = router