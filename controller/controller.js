const passportConfig = require("../config/passport-setup"); // Import the reusable Passport configuration
const User = require("../model/user-model"); // Assuming you have a User model defined

function handleGoogleCallback(req, res) {
  return async function () {
    try {
      const profile = req.user;

      const existingUser = await User.findOne({ userId: profile.id });

      if (existingUser) {
        console.log("User already exists:", existingUser);
        return res.redirect("/login"); // Redirect to login page or handle as needed
      }

      const newUser = new User({
        userId: profile.id,
        username: profile.displayName,
      });

      const savedUser = await newUser.save();
      console.log("New User:", savedUser);

      // Redirect or respond after successful registration
      res.redirect("/");
    } catch (error) {
      console.error("Error in registration callback:", error);
    }
  };
}

module.exports = {
  handleGoogleCallback,
};
