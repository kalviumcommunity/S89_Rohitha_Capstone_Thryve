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
      const {userName,workoutType,duration,exercises,videoUrl,imageUrl,notes} = req.body;
  
      const newFitnessPost = new fitness({userName,workoutType,duration,exercises,videoUrl,imageUrl,notes});
  
      await newFitnessPost.save();
  
      res.status(201).json({message: 'Fitness post added successfully!',fitness: newFitnessPost});
    } catch (error) {
      console.error(error);
      res.status(500).json({message: 'Error adding fitness post',error});
    }
  });

  fitnessRouter.put('/updatefitness/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const {userName,workoutType,duration,exercises,videoUrl,imageUrl,notes} = req.body;
  
      const updatedFitness = await fitness.findByIdAndUpdate({_id:id}, {userName,workoutType,duration,exercises,videoUrl,imageUrl,notes}, {
        new: true,
        runValidators: true,
      });
  
      if (!updatedFitness) {
        return res.status(404).json({ message: 'Fitness entry not found' });
      }
  
      res.status(200).json({message: 'Fitness entry updated successfully',fitness: updatedFitness,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({message: 'Error updating fitness entry',error,});
    }
  });

  fitnessRouter.delete('/deletefitness/:id', async (req, res) => {
    try {
      const { id } = req.params;
  
      const deletedFitness = await fitness.findByIdAndDelete(id);
  
      if (!deletedFitness) {
        return res.status(404).json({ message: 'Fitness entry not found' });
      }
  
      res.status(200).json({ message: 'Fitness entry deleted successfully', fitness: deletedFitness });
    } catch (error) {
      console.error('Error deleting fitness posts:', error.message);
      res.status(500).json({ message: 'Error deleting fitness entry', error });
    }
  });

  fitnessRouter.patch('/patchfitness/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const updateFields = req.body;
  
      const updatedFitness = await fitness.findByIdAndUpdate(id, updateFields, {
        new: true,
        runValidators: true,
      });
  
      if (!updatedFitness) {
        return res.status(404).json({ message: 'Fitness entry not found' });
      }
  
      res.status(200).json({ message: 'Fitness entry partially updated', fitness: updatedFitness });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error updating fitness entry', error });
    }
  });
  
  
  
  
module.exports = fitnessRouter;