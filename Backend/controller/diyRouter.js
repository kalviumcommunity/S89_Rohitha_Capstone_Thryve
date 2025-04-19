const express = require("express");
const diyRouter = express.Router();
const diy = require('../models/diySchema');


diyRouter.get('/diy-projects', async(req,res)=>{
    try {
        const diyProjects = ['Home Decor', 'Upcycled Crafts', 'DIY Travel Gear'];
        res.status(200).send(diyProjects);
    } catch (error) {
        console.error(error);
        res.status(500).send({msg:"Something went wrong"});
    }
});

diyRouter.post('/adddiy', async (req, res) => {
    try {
      const {title,description,materials,steps,imageUrl,videoUrl,category,estimatedTime,difficulty,tags} = req.body;
  
      const newDIYPost = new diy({title,description,materials,steps,imageUrl,videoUrl,category,estimatedTime,difficulty,tags});
  
      await newDIYPost.save();
  
      res.status(201).json({message: 'DIY post added successfully!',diy: newDIYPost});
    } catch (error) {
      console.error(error);
      res.status(500).json({message: 'Error adding DIY post',error});
    }
  });
  
module.exports = diyRouter;