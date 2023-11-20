const express = require("express");
const passportConfig = require("../config/passport-setup"); // Import the reusable Passport configuration
const User = require("../model/user-model"); // Assuming you have a User model defined

const router = express.Router();

// Register a new user using Google authentication
router.get("/google", passportConfig.authenticate("google", { scope: ["profile"] }));

router.get(
  "/google/callback",
  passportConfig.authenticate("google", { failureRedirect: "/" }),
  async (req, res) => {
    try {
      // If you want to handle user creation separately, you can access the profile from req.user
      const profile = req.user;

      // Check if the user already exists in your database
      const existingUser = await User.findOne({ userId: profile.id });

      if (existingUser) {
        // User already exists, you can handle this case accordingly
        console.log("User already exists:", existingUser);
        return res.redirect("/login"); // Redirect to login page or handle as needed
      }

      // User does not exist, create a new user
      const newUser = new User({
        userId: profile.id,
        username: profile.displayName,
      });

      // Save the new user to the database
      const savedUser = await newUser.save();
      console.log("New User:", savedUser);

      // Redirect or respond after successful registration
      res.redirect("/dashboard");
    } catch (error) {
      console.error("Error in registration callback:", error);
      res.redirect("/error"); 
    }
  }
);

module.exports = router;
