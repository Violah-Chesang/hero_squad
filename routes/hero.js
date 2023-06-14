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
    const strengthFeature =await Strength.findOne({"strengthId" : req.body.strengthId});
   
    if(!strengthFeature){
        res.status(400).json({"error" : "Could not find the strength"});
    }
   
    //weakness
    const weaknessFeature =await Weakness.findOne({"weaknessId" : req.body.weaknessId});
   
    if(!weaknessFeature){
        res.status(400).json({"error" : "Could not find the weakness"});
    }

    //squad
    const findHerosSquad =await Squad.findOne({"squadId" : req.body.squadId});
   
    if(!findHerosSquad){
        res.status(400).json({"error" : "Could not find the squad"});
    } 

    const newHero = new Hero({
        heroId : heroBody.heroId,
        name : heroBody.name,
        age : heroBody.age,
        strength :strengthFeature.name,
        weakness : weaknessFeature.name,
        deleted : false,
        assigned :false,
        squadId: findHerosSquad.name
      });

        await newHero.save();
        res.json(newHero);
 });


//View all the heros- GET, hero/all, Hero.find({})
router.get('/hero/all',async (req,res) => {
    const allHeroes =await Hero.find({});
    res.json(allHeroes);
});

 //Find a hero and their characteristics - GET, Hero/find/:heroId, Hero.find({id: heroId})
router.get('/hero/find/:heroId',async (req,res) => {
    const heroById = await Hero.find({"heroId": req.params.heroId});
    res.json(heroById);
});

//Update a hero - POST/PUT, Hero/update/:heroId, Hero.findOneAndUpdate({id: heroId})
router.post('/hero/update/:heroId',async (req,res) => {
    const filter = {"heroId" : req.params.heroId};
    const update = {"name": req.body.name};
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

//Place a hero in a squad - POST, hero/allocate-squad/:heroId, newHeroSquad.save() 
router.post('/hero/allocate-squad/:heroId', (req,res) => {
    //check if assigned is false and assigns true.
    const heroId = req.params.heroId;
    const squadId = req.body.squadId;
    const assigned = req.body.assigned;
    
     function assignHero(squadId, assigned){
        if(!assigned && !squadId){
            assigned = true;
            squadId = {"squadId" : squadId};
        }
        return {squadId, assigned};
     }
     const {squadId : updatedSquadId, assigned : updatedAssigned} = assignHero(squadId, assigned);
    
     res.json({ heroId, updatedSquadId, updatedAssigned });

});

//hero without squad(assigned==false)- GET, hero/without-squad
router.get('/hero/without-squad',async (req,res) => {
    //get all hero that assigned is false
    const notAssignedHeroes =await Hero.find({"assigned" : false});

    res.json(notAssignedHeroes);
});

//Hero should not be in more than one squad- POST, hero/hero-assigned-squad/:heroId
//if assigned is true give an error
router.get('/hero/hero-assigned-squad/:heroId', async (req,res) => {
    const hero = await Hero.find({"heroId" : req.params.heroId})

     if(hero.assigned){
        res.json({"message" : "Hero already assigned to a squad"})
    }
});

module.exports = router