const express = require("express");
const foodRouter = express.Router();
const food = require('../models/foodSchema');

foodRouter.get('/food/:dish', async (req, res) => {
    try {
        const { dish } = req.params;

        const recipeData = {
            name: dish,
            ingredients: ['Ingredient 1', 'Ingredient 2', 'Ingredient 3'],
            steps: [
                'Step 1: Do this.',
                'Step 2: Do that.',
                'Step 3: Finish and serve.'
            ],
            cookTime: '30 minutes',
        };

        res.status(200).send(recipeData);


    }catch(error){
        console.log(error)
        res.status(500).send({msg:"Something went wrong"});
    }
    });
foodRouter.post('/addfood', async (req, res) => {
      try {
          const {title,ingredients,instructions,imageUrl,videoUrl,category,cookTime,servings,tags} = req.body;
          const newFoodPost = new food({title,ingredients,instructions,imageUrl,videoUrl,category,cookTime,servings,tags});
         await newFoodPost.save();
      
          res.status(201).json({message: 'Food post added successfully!',food: newFoodPost});
     } catch (error) {
          console.error(error);
          res.status(500).json({message: 'Error adding food post',error});
        }
      });

foodRouter.put('/updatefood/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = req.body;
      
        const updatedFood = await food.findByIdAndUpdate(id, updateData, {
            new: true,
            runValidators: true,
        });
      
        if (!updatedFood) {
          return res.status(404).json({ message: 'Food recipe not found' });
        }
      
        res.status(200).json({message: 'Food recipe updated successfully',food: updatedFood,});
  } catch (error) {
        console.error(error);
        res.status(500).json({message: 'Error updating food recipe',error,});
        }
      });

 foodRouter.delete('/deletefood/:id', async (req, res) => {
        try {
          const { id } = req.params;
      
          const deletedFood = await food.findByIdAndDelete(id);
      
          if (!deletedFood) {
            return res.status(404).json({ message: 'Food recipe not found' });
          }
      
          res.status(200).json({ message: 'Food recipe deleted successfully', food: deletedFood });
        } catch (error) {
          console.error('Error deleting food post:', error.message);
          res.status(500).json({ message: 'Error deleting food recipe', error });
        }
      });

    foodRouter.patch('/patchfood/:id', async (req, res) => {
        try {
          const { id } = req.params;
          const updateFields = req.body;
      
          const updatedFood = await food.findByIdAndUpdate(id, updateFields, {
            new: true,
            runValidators: true,
          });
      
          if (!updatedFood) {
            return res.status(404).json({ message: 'Food recipe not found' });
          }
      
          res.status(200).json({ message: 'Food recipe partially updated', food: updatedFood });
        } catch (error) {
          console.error(error);
          res.status(500).json({ message: 'Error updating food recipe', error });
        }
      });
module.exports=foodRouter;