const mongoose = require('mongoose');

const fitnessSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', 
    required: true,
  },
  workoutType: {
    type: String,
    enum: ['Cardio', 'Strength', 'Flexibility', 'Balance', 'HIIT', 'Yoga', 'Other'],
    required: true,
  },
  duration: {
    type: Number,
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
  date: {
    type: Date,
    default: Date.now,
  },
  exercises: [
    {
      name: String,
      sets: Number,
      reps: Number,
      weight: Number, 
      notes: String,
    }
  ],
  notes: {
    type: String,
    default: '',
  }
});

const Fitness = mongoose.model('Fitness', fitnessSchema);
module.exports = Fitness;
