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
router.post('hero/update/:heroId', (req,res) => {
    res.json({"message" : `Update hero's information by Id: ${req.body}`})
});

//delete a hero - POST/DELETE, Hero/delete/:heroId, Hero.findOneAndUpdate({id: heroId})- deleted : true
router.post('hero/delete/:heroId', (req,res) => {
    res.json({"message" : `delete a hero by Id: ${req.body.deleted}`})
});

module.exports = router