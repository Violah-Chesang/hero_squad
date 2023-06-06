const express = require('express');
const squad = require('../models/squad');

const router = express.Router();

// Create a Squad - POST, squad/add, newSquad.Save()
router.post('/squad/add', (req,res) => {
    res.json({"message" : `Add a new Squad with payload: ${req.body}`});
});

//View all the squads- GET, squad/all, Squad.find({})
router.get('/squad/all', (req,res) => {
    res.json({"message" : `View all the squads`})
});

 //Find a squad - GET, squad/find/:squadId, Squad.find({id: squadId})
 router.get('/squad/find/:squadId', (req,res) => {
    res.json({"message" : `Find a squad by Id. Squad Id is: ${req.params.heroId}`})
});


//Update a squad - POST/PUT, squad/update/:squadId, Squad.findOneAndUpdate({id: squadId})
router.post('/squad/update/:squadId', (req,res) => {
    res.json({"message" : `Update squad's information by Id. Squad ID: ${req.body}`})
});

//delete a squad - POST/DELETE, squad/delete/:squadId, Squad.findOneAndUpdate({id: squadId})- deleted : true
router.post('/squad/delete/:squadId', (req,res) => {
    res.json({"message" : `delete a squad by Id: ${req.body.deleted}`})
});

 //Find a squad's characteristics - GET, squad/features/:squadId, squad.find({id: squadId})
 router.get('/squad/features/:squadId', (req,res) => {
    res.json({"message" : `Find a squad's characteristics by Id: ${req.params.squadId}`})
});

module.exports = router