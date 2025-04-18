const mongoose = require('mongoose');

const studySchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: false, 
  },
  title: {
    type: String,
    required: true,
    trim: true,
  },
  subject: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
  },
  content: {
    type: String, 
    required: true,
  },
  resources: {
    type: [String], 
    default: [],
  },
  videoUrl: {
    type: String,
    default: '',
  },
  uploadedVideo: {
    type: String,
    default: '',
  },
  uploadedFiles: {
    type: [String], 
    default: [],
  },
  tags: {
    type: [String],
    default: [],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

const Study = mongoose.model('Study', studySchema);
module.exports = Study;
