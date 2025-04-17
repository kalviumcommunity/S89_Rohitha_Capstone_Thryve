const express = require("express");
const fitnessRouter = express.Router();
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
module.exports = fitnessRouter;