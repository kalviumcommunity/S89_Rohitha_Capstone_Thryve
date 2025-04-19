const mongoose = require('mongoose');

const diySchema = new mongoose.Schema({
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
  imageUrl: {
    type: String,
    default: '',
  },
  videoUrl: {
    type: String,
    default: '',
  
  },
  tags: {
    type: [String],
    default: [],
  }
});

const DIY = mongoose.model('DIY', diySchema);
module.exports = DIY;
