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
      const {userName,title,subject,description,content,difficulty,tags,createdAt} = req.body;
  
      const newStudyPost = new study({userName,title,subject,description,content,difficulty,tags,createdAt});
  
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

  studyRouter.delete('/deletestudy/:id', async (req, res) => {
    try {
      const { id } = req.params;
  
      const deletedStudy = await study.findByIdAndDelete(id);
  
      if (!deletedStudy) {
        return res.status(404).json({ message: 'Study post not found' });
      }
  
      res.status(200).json({ message: 'Study post deleted successfully', study: deletedStudy });
    } catch (error) {
      console.error('Error deleting study post:', error.message);
      res.status(500).json({ message: 'Error deleting study post', error });
    }
  });

  studyRouter.patch('/patchstudy/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updateFields = req.body;

    const updatedStudy = await study.findByIdAndUpdate(id, updateFields, {
      new: true,
      runValidators: true,
    });

    if (!updatedStudy) {
      return res.status(404).json({ message: 'Study post not found' });
    }

    res.status(200).json({ message: 'Study post partially updated', study: updatedStudy });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error updating study post', error });
  }
});

  
module.exports = studyRouter;