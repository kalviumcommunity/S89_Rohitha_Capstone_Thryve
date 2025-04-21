const express = require('express');
const studyRouter = express.Router();
const study = require('../models/studySchema.js');

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

studyRouter.post('/addstudy', async (req, res) => {
    try {
      const {title,subject,description,content,pdfUrl,videoUrl,imageUrl,difficulty,tags} = req.body;
  
      const newStudyPost = new study({title,subject,description,content,pdfUrl,videoUrl,imageUrl,difficulty,tags});
  
      await newStudyPost.save();
  
      res.status(201).json({message: 'Study post added successfully!',study: newStudyPost});
    } catch (error) {
      console.error(error);
      res.status(500).json({message: 'Error adding study post',error});
    }
  });

  studyRouter.put('/updatestudy/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const updateData = req.body;
  
      const updatedStudy = await study.findByIdAndUpdate(id, updateData, {
        new: true,
        runValidators: true,
      });
  
      if (!updatedStudy) {
        return res.status(404).json({ message: 'Study post not found' });
      }
  
      res.status(200).json({message: 'Study post updated successfully',study: updatedStudy,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({message: 'Error updating study post',error,});
    }
  });
  
module.exports = studyRouter;