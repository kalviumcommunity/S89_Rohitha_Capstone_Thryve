const express = require("express");
const userSchema = require("../models/userSchema");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userRouter = express.Router();

// Signup Route
userRouter.post("/signup", async (req, res) => {
  try {
    const { name,username, email, password } = req.body;

    // Validate input
    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if user already exists
    const userExists = await userSchema.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already registered" });
    }

    // Hash password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create new user
    const newUser = await userSchema.create({
      name,
      username,
      email,
      password: hashedPassword,
    });

    // Generate JWT token
    const token = jwt.sign(
      { name: newUser.name, username: newUser.username, email: newUser.email, id: newUser.id },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    return res.status(201).json({
      message: "User registered successfully",
      token,
      name: newUser.name,
      username: newUser.username,
      email: newUser.email,
      id: newUser.id,
    });
  } catch (error) {
    console.error("Signup Error:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

// Login Route
userRouter.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Find user by email
    const user = await userSchema.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Compare passwords
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Generate JWT token
    const token = jwt.sign(
      { name: user.name, username: user.username, email: user.email, id: user.id },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    return res.status(200).json({
      message: "User logged in successfully",
      token,
      name: user.name,
      username: user.username,
      email: user.email,
      profilePhoto: user.profilePhoto,
      id: user.id,
    });
  } catch (error) {
    console.error("Login Error:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

userRouter.put('/profile', async (req, res) => {
  try {
    const { email, name, username, profilePhoto } = req.body; 
    const user = await userSchema.findOneAndUpdate(
      { email },
      { name, username, profilePhoto }, 
      { new: true }
    );
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json({
      name: user.name,
      username: user.username,
      email: user.email,
      profilePhoto: user.profilePhoto, 
    });
  } catch (err) {
    res.status(500).json({ message: 'Error updating profile' });
  }
});

// Get all users (except the current user)
userRouter.get('/all', async (req, res) => {
  try {
    const { email } = req.query; // Pass current user's email as query param
    const users = await userSchema.find(email ? { email: { $ne: email } } : {}, '-password');
    res.json({ users });
  } catch (err) {
    res.status(500).json({ message: 'Error fetching users' });
  }
});

module.exports = userRouter;