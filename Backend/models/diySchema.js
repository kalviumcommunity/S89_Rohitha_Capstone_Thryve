const mongoose = require('mongoose');

const diySchema = new mongoose.Schema({
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
  category: {
    type: String,
    enum: ['Home Decor', 'Electronics', 'Crafts', 'Woodwork', 'Fashion', 'Gardening', 'Other'],
    default: 'Other',
  },
  description: {
    type: String,
    required: true,
  },
  materials: {
    type: [String], 
    required: true,
  },
  steps: {
    type: [String], 
    required: true,
  },
  difficulty: {
    type: String,
    enum: ['Easy', 'Medium', 'Hard'],
    default: 'Medium',
  },
  estimatedTime: {
    type: String, 
    required: true,
  },
  tags: {
    type: [String],
    default: [],
  }
});

const DIY = mongoose.model('DIY', diySchema);
module.exports = DIY;
