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
module.exports=foodRouter;