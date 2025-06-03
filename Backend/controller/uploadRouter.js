const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

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

// Upload endpoint
uploadRouter.post('/upload', upload.single('video'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded.' });
  }
  res.json({ message: 'Video uploaded successfully!', filename: req.file.filename });
});

// List all uploaded videos
uploadRouter.get('/videos', (req, res) => {
  fs.readdir(uploadDir, (err, files) => {
    if (err) {
      return res.status(500).json({ message: 'Error reading uploads.' });
    }
    // Only return video files (basic filter)
    const videoFiles = files.filter(file =>
      file.endsWith('.mp4') || file.endsWith('.mov') || file.endsWith('.webm') || file.endsWith('.avi') || file.endsWith('.mkv')
    );
    res.json({ videos: videoFiles });
  });
});

// DELETE /recipes/videos/:filename
uploadRouter.delete('/videos/:filename', (req, res) => {
  const filename = req.params.filename;
  const filePath = path.join(uploadDir, filename);
  fs.unlink(filePath, (err) => {
    if (err) {
      return res.status(500).json({ message: 'Failed to delete video.' });
    }
    res.json({ message: 'Video deleted successfully.' });
  });
});

// (Optional) Edit/Rename endpoint
uploadRouter.put('/videos/:filename', (req, res) => {
  const oldName = req.params.filename;
  const newName = req.body.newName;
  if (!newName) return res.status(400).json({ message: 'New name required.' });

  const oldPath = path.join(uploadDir, oldName);
  const newPath = path.join(uploadDir, newName);

  fs.rename(oldPath, newPath, (err) => {
    if (err) {
      return res.status(500).json({ message: 'Failed to rename video.' });
    }
    res.json({ message: 'Video renamed successfully.' });
  });
});

module.exports = uploadRouter;