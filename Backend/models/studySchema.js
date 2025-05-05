const mongoose = require('mongoose');

const studySchema = new mongoose.Schema({
  userName: {
    type: String,
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
