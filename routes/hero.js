const express = require('express');
const Hero = require('../models/hero');
const Strength = require('../models/strength');
const Weakness = require('../models/weakness');
const Squad = require('../models/squad');

const router = express.Router();

// Create a hero - POST, hero/add, newHero.Save()
router.post('/hero/add',async (req,res) => {
    const heroBody = req.body;
     //strength
    const strength = await Strength.find({"name": req.body.name});
    //weakness
    const weakness = await Weakness.find({"name" : req.body.name}); 
    //squad
    const squad = await Squad.find({"name" : req.body.name});

    const newHero = new Hero({
        heroId : heroBody.heroId,
        name : heroBody.name,
        age : heroBody.age,
        strength :strength,
        weakness : weakness,
        deleted : false,
        assigned :false,
        squadId: squad
    });
    newHero.save();
    res.json(newHero);
 });


//View all the heros- GET, hero/all, Hero.find({})
router.get('/hero/all',async (req,res) => {
    const allHeroes =await Hero.find({});
    res.json(allHeroes);
});

 //Find a hero - GET, Hero/find/:heroId, Hero.find({id: heroId})- List all the squads
router.get('/hero/find/:heroId',async (req,res) => {
    const heroById = await Hero.find({"heroId": req.params.heroId});
    res.json(heroById);
});

//Update a hero - POST/PUT, Hero/update/:heroId, Hero.findOneAndUpdate({id: heroId})
router.post('/hero/update/:heroId',async (req,res) => {
    const filter = {"heroId" : req.params.heroId};
    const update = {"name": req.params.name};
    const options = { new : true};

    const updatedHero =  await Hero.findOneAndUpdate(filter,update,options);

    res.json(updatedHero);
});

//delete a hero - POST/DELETE, Hero/delete/:heroId, Hero.findOneAndUpdate({id: heroId})- deleted : true
router.post('/hero/delete/:heroId',async (req,res) => {
    const filter = {"heroId" : req.params.heroId};
    const update = {"deleted": true};

    const deletedHero =  await Hero.findOneAndUpdate(filter,update);

    res.json({"message" : "Record deleted"});
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