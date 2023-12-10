const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy; // Import the correct class
const keys = require("./keys");
const User = require("../model/user-model");

// Serialize the user into a session
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  const user = await User.findById(id);
  done(null, user);
});

// Set up a new instance of the Google authentication strategy for Passport
passport.use(
  new GoogleStrategy(
    {
      // Options for Google strategy
      callbackURL: "/auth/google/redirect",
      clientID: keys.google.clientID,
      clientSecret: keys.google.clientSecret,
    },
    async (accessToken, refreshToken, profile, done) => {
      // Passport callback function

      // Check if the user already exists in the database
      const existingUser = await User.findOne({ googleId: profile.id });

      if (existingUser) {
        // User already exists, no need to create a new one
        return done(null, existingUser);
      }

      // User does not exist, create a new user
      const newUser = new User({
        googleId: profile.id,
        username: profile.displayName,
        email: profile?.emails ? profile?.emails[0]?.value : "",
      });

      // Save the new user to the database
      const savedUser = await newUser.save();

      // Pass the user to the done callback
      done(null, savedUser);
    }
  )
);

// Export the configured Passport instance for use in other parts of the application
module.exports = passport;
