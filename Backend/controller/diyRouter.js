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

  diyRouter.put('/updatediy/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const updateData = req.body;
  
      const updatedDIY = await diy.findByIdAndUpdate(id, updateData, {
        new: true,
        runValidators: true,
      });
  
      if (!updatedDIY) {
        return res.status(404).json({ message: 'DIY project not found' });
      }
  
      res.status(200).json({ message: 'DIY project updated successfully', diy: updatedDIY });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error updating DIY project', error });
    }
  });

  diyRouter.delete('/deletediy/:id', async (req, res) => {
    try {
      const { id } = req.params;
  
      const deletedDIY = await diy.findByIdAndDelete(id);
  
      if (!deletedDIY) {
        return res.status(404).json({ message: 'DIY project not found' });
      }
  
      res.status(200).json({ message: 'DIY project deleted successfully', diy: deletedDIY });
    } catch (error) {
      console.error('Error deleting diy posts:', error.message);
      res.status(500).json({ message: 'Error deleting DIY project', error });
    }
  });

  diyRouter.patch('/patchdiy/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const updateFields = req.body;
  
      const updatedDIY = await diy.findByIdAndUpdate(id, updateFields, {
        new: true,
        runValidators: true,
      });
  
      if (!updatedDIY) {
        return res.status(404).json({ message: 'DIY project not found' });
      }
  
      res.status(200).json({ message: 'DIY project partially updated', diy: updatedDIY });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error updating DIY project', error });
    }
  });
  

module.exports = diyRouter;