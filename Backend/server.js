const express = require("express");
const app = express();

const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const cors = require("cors");
app.use(cors());

const session = require("express-session");
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("./models/userSchema"); // Adjust path if needed
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

app.get('/',(req,res)=>{
    res.json("Backend server is running")
})

// Session middleware (required for Passport)
app.use(session({
  secret: process.env.SESSION_SECRET || "your_session_secret",
  resave: false,
  saveUninitialized: true,
}));

app.use(passport.initialize());
app.use(passport.session());

// Passport Google OAuth Strategy
passport.use(new GoogleStrategy({
    clientID:process.env.clientID, // Set in your .env
    clientSecret: process.env.clientSecret, // Set in your .env
    callbackURL: process.env.callbackURL, // Set in your .env
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
      // Find or create user
      let user = await User.findOne({ email: profile.emails[0].value });
      if (!user) {
        user = await User.create({
          name: profile.displayName,
          email: profile.emails[0].value,
          password: "google-oauth", // Placeholder, not used
        });
      }
      console.log("User found or created:", profile);
      return done(null, user);
    } catch (err) {
      return done(err, null);
    }
  }
));

// Serialize/deserialize user
passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser(async (id, done) => {
  const user = await User.findById(id);
  done(null, user);
});

// Google OAuth routes
app.get("/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

app.get("/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  (req, res) => {
    // Send user info as query params
    const name = encodeURIComponent(req.user.name);
    const email = encodeURIComponent(req.user.email);
    res.redirect(`http://localhost:5173/main?name=${name}&email=${email}`);
  }
);

const diyRouter = require("./controller/diyRouter");
const fitnessRouter = require("./controller/fitnessRouter");
const foodRouter = require("./controller/foodRouter");
const studyRouter = require("./controller/studyRouter");
const aiRouter = require("./controller/aiRouter");
const userRouter = require("./controller/userRouter");
const uploadRouter = require('./controller/uploadRouter');

app.use("/diy", diyRouter);
app.use("/fitness", fitnessRouter);
app.use("/food", foodRouter);
app.use("/study", studyRouter);
app.use("/ai", aiRouter);
app.use("/user", userRouter);
app.use("/recipes", uploadRouter);
app.use('/uploads', express.static('uploads'));
app.listen(8080, async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log("Server connected on port 8080");
    } catch (error) {
        console.log("Something went wrong:", error);
    }
});
