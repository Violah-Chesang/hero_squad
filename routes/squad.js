const express = require('express');
const Squad = require('../models/squad');

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
 //we need: Id, name, cause, , number of heroes
 router.get('/squad/features/:squadId',async (req,res) => {
    const squadFeatures =await Squad.find({});
//Get all heroes with squadfeature.squadId
// The length of the result will be he number of heroes

});

module.exports = router