const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const Video = require('../models/videoSchema');

const uploadRouter = express.Router();

const uploadDir = path.join(__dirname, '..', 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});
const upload = multer({ storage: storage });

// Upload endpoint (now saves uploaderEmail)
uploadRouter.post('/upload', upload.single('video'), async (req, res) => {
  try {
    const { uploaderEmail } = req.body;
    if (!req.file || !uploaderEmail) {
      return res.status(400).json({ message: 'No file or uploader email provided.' });
    }
    await Video.create({
      filename: req.file.filename,
      uploaderEmail
    });
    res.json({ message: 'Video uploaded successfully!', filename: req.file.filename });
  } catch (err) {
    res.status(500).json({ message: 'Upload failed.' });
  }
});

// List videos for a specific user
uploadRouter.get('/videos', async (req, res) => {
  try {
    const { uploaderEmail } = req.query;
    if (!uploaderEmail) {
      return res.status(400).json({ message: 'Missing uploaderEmail in query.' });
    }
    const videos = await Video.find({ uploaderEmail });
    res.json({ videos: videos.map(v => v.filename) });
  } catch (err) {
    res.status(500).json({ message: 'Error fetching videos.' });
  }
});

// DELETE /recipes/videos/:filename
uploadRouter.delete('/videos/:filename', async (req, res) => {
  const filename = req.params.filename;
  const filePath = path.join(uploadDir, filename);
  try {
    // Remove from DB
    await Video.deleteOne({ filename });
    // Remove file from disk
    fs.unlink(filePath, (err) => {
      if (err) {
        return res.status(500).json({ message: 'Failed to delete video file.' });
      }
      res.json({ message: 'Video deleted successfully.' });
    });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete video.' });
  }
});

// Edit/Rename endpoint
uploadRouter.put('/videos/:filename', async (req, res) => {
  const oldName = req.params.filename;
  const newName = req.body.newName;
  if (!newName) return res.status(400).json({ message: 'New name required.' });

  const oldPath = path.join(uploadDir, oldName);
  const newPath = path.join(uploadDir, newName);

  try {
    // Rename file on disk
    fs.renameSync(oldPath, newPath);
    // Update DB
    await Video.findOneAndUpdate({ filename: oldName }, { filename: newName });
    res.json({ message: 'Video renamed successfully.' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to rename video.' });
  }
});

module.exports = uploadRouter;