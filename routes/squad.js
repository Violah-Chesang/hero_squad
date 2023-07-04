const express = require('express');
const Squad = require('../models/squad');
const Hero = require('../models/hero');
const Strength = require('../models/strength');
const Weakness = require('../models/weakness');

const router = express.Router();

//test route
router.get('/squad/find',async (req,res) => {
    const hero = await Hero.find({"squadId": req.body.squadId});
    const heroName = hero.map((her) => {
        return her.name;
    })
    res.json(heroName);
});

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
    const squadId = req.params.squadId;

    const squadDetails = await Squad.find({"squadId" : squadId});

    let deletedState = squadDetails.deleted;

    if(!deletedState){
        deletedState = true;
    }

    res.json(squadDetails);
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

        //calculate squad's score
        //TODO
        //      - Get the heroes with the given squadId
        //      - do a sum to the heroes' score
    router.get('/squad/score',async (req, res) => {
        //select the squad to check the scores
        const squad = await Squad.findOne({"squadId" : req.body.squadId});
        const id = squad.squadId; 
        console.log(id);



        // find heroes with the given squadId
        const heroes = await Hero.find({"squadId" : id}); 
        
        //find the strength name
        const heroStrength = heroes.map((hero) => {
            return hero.strength;
        })        
        // console.log(heroStrength);

        // find strength by the names of the list above
        const strengths = await Promise.all(
            heroStrength.map((strengthName) => {
                return Strength.find({'name': strengthName});
            })
        );
        // console.log(strengths);

        // find the values
        const strengthValues = strengths.map((values) => {
                return values.map((strength) =>{
                    return strength.value;
                })
            });
        // console.log(strengthValues);

        //find the strength name
        const heroWeakness = heroes.map((hero) => {
            return hero.weakness;
        });
        // console.log(heroWeakness);

        // find weakness by the names of the list above
        const weaknesses = await Promise.all(
            heroWeakness.map((weaknessName) => {
                return Weakness.find({'name': weaknessName});
            })
        );
        // console.log(weaknesses);
        // find the values
        const weaknessValues = weaknesses.map((values) => {
            return values.map((weakness) =>{
                return weakness.value;
            })
        });
        // console.log(weaknessValues);

        //find the sum of strength and weakness values. Use array.flat() and array.reduce()
        //flat()
        const strengthFlat = strengthValues.flat(Infinity);
        // console.log(strengthFlat);

        const strengthSum = strengthFlat.reduce((accumulator, currentValue) =>{
            return accumulator + currentValue;
        }, 0);

        console.log(strengthSum);

        //weakness sum
        const weaknessFlat = weaknessValues.flat(Infinity);

        const weaknessSum = weaknessFlat.reduce((accumulator, currentValue) => {
            return accumulator + currentValue;
        },0);

        console.log(weaknessSum);

        //find the score. Add strengthSum and WeaknessSum
        const score = strengthSum + weaknessSum;

        res.json(`Squad ${id} has a score of ${score}`)
         
    });


module.exports = router