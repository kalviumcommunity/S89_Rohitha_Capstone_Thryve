const express = require("express");
const aiRouter = express.Router();
aiRouter.get('/search', async(req,res)=>{
    try{
        const { category } = req.query;

    const search = [
        { name: 'Healthy Recipe Blog', category: 'food' },
        { name: 'Smoothie Recipes', category: 'food' },
        { name: 'Home Workout App', category: 'fitness' },
        { name: '30-Day Fitness Challenge', category: 'fitness' },
        { name: 'DIY Craft Channel', category: 'diy' },
        { name: 'DIY Home Decor', category: 'diy' },
        { name: 'Study With Me Pomodoro Videos', category: 'study' },
        { name: 'Focus Music Playlist', category: 'study' },
    ].filter(rec => rec.category === category);

    if (search.length === 0) {
        return res.status(404).send({ message: "No search found" });
    }

    res.status(200).send(search);

    }catch(error){
        console.log(error)
        res.status(500).send({msg:"Something went wrong"});
    }
      
});
module.exports=aiRouter;

