const express = require("express");
const fitnessRouter = express.Router();
const fitness = require('../models/fitnessSchema');

fitnessRouter.get('/fitness', async (req, res) => {
    try {
        const { location } = req.query;

        const fitnessOptions = [
            { type: 'Gym', name: 'FitZone', distance: '300m' },
            { type: 'Yoga Class', name: 'Zen Flow', time: '6 PM' },
            { type: 'Running Track', location: 'Central Park', distance: '800m' },
        ];

        res.status(200).send(fitnessOptions);
    }catch(error){
        console.log(error)
        res.status(500).send({msg:"Something went wrong"});
    }
});

fitnessRouter.post('/addfitness', async (req, res) => {
    try {
      const {
        userId,
        workoutType,
        duration,
        exercises,
        videoUrl,
        imageUrl,
        notes
      } = req.body;
  
      const newFitnessPost = new fitness({
        userId,
        workoutType,
        duration,
        exercises,
        videoUrl,
        imageUrl,
        notes
      });
  
      await newFitnessPost.save();
  
      res.status(201).json({
        message: 'Fitness post added successfully!',
        fitness: newFitnessPost
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        message: 'Error adding fitness post',
        error
      });
    }
  });
  
module.exports = fitnessRouter;