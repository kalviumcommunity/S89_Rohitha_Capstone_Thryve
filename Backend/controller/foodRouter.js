const express = require("express");
const foodRouter = express.Router();
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
module.exports=foodRouter;