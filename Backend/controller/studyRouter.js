const express = require('express');
const studyRouter = express.Router();

studyRouter.get('/study-resources', async (req, res) => {
    try {
        const studyResources = [
            { type: 'Timer', description: '25-min focus, 5-min break' },
            { type: 'Online Course', name: 'Intro to Psychology', platform: 'Coursera' },
        
        ];

        res.status(200).send(studyResources);
    } catch (error) {
        console.error(error);
        res.status(500).send({msg:"Something went wrong"});
    }
});

module.exports = studyRouter;