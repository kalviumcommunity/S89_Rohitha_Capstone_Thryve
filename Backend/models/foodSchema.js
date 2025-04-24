const mongoose = require("mongoose");
const foodSchema = new mongoose.Schema({
    userName: {
        type: String,
        ref: 'User',
        required: false,
      },
      
    title:{
         type:String,
         required:true,
        trim:true,
       },
       ingredients: {
        type: [String],
        required: true,
      },
      instructions: {
        type: String,
        required: true,
      },
      
      category: {
        type: String,
        enum: ['Breakfast', 'Lunch', 'Dinner', 'Snack', 'Dessert', 'Drink'],
        default: 'Lunch',
      },
      cookTime: {
        type: String, 
        required: true,
      },
      servings: {
        type: Number,
        default: 1,
      },
      createdAt: {
        type: Date,
        default: Date.now,
      },
      tags: {
        type: [String],
        default: [],
      },
});
const Food = mongoose.model('Food', foodSchema);
module.exports = Food;