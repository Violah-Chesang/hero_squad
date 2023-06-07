const express = require('express');
const hero = require('../models/hero');

const router = express.Router();

// Create a hero - POST, hero/add, newHero.Save()
router.post('/hero/add', (req,res) => {
    res.json({"message" : `Add a new hero with payload: ${req.body}`});
    res.send("dd a new hero with payload");
});

 //Find a hero - GET, Hero/find/:heroId, Hero.find({id: heroId})- List all the squads
router.get('/hero/find/:heroId', (req,res) => {
    res.json({"message" : `Find a user by Id: ${req.params.heroId}`})
});

//Update a hero - POST/PUT, Hero/update/:heroId, Hero.findOneAndUpdate({id: heroId})
router.post('/hero/update/:heroId', (req,res) => {
    res.json({"message" : `Update hero's information by Id: ${req.body}`})
});

//delete a hero - POST/DELETE, Hero/delete/:heroId, Hero.findOneAndUpdate({id: heroId})- deleted : true
router.post('/hero/delete/:heroId', (req,res) => {
    res.json({"message" : `delete a hero by Id: ${req.body.deleted}`})
});

 //Find a hero's characteristics - GET, Hero/features/:heroId, Hero.find({id: heroId})
 router.get('/hero/features/:heroId', (req,res) => {
    res.json({"message" : `Find a hero's characteristics by Id: ${req.params.heroId}`})
});

//Place a hero in a squad - POST, hero/allocate-squad/:heroId, newHeroSquad.save() 
router.post('/hero/allocate-squad/:heroId', (req,res) => {
    res.json({"message" : `Allocate a hero to a squad by Id. Id no. ${req.params.heroId}`})
});

//hero without squad(assigned==false)- GET, hero/without-squad
router.get('/hero/without-squad', (req,res) => {
    res.json({"message" : `Heroes without squads`})
});

//Hero should not be in more than one squad- POST, hero/hero-assigned-squad/:heroId
//if assigned is true give an error
router.post('/hero/hero-assigned-squad/:heroId', (req,res) => {
    res.json({"message" : `Check if a hero has been assigned a squad by Id. Id no. ${req.params.heroId}`})
});

module.exports = router