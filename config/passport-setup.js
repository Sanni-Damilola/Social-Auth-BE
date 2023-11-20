const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20");
const keys = require("./keys");
const User = require("../model/user-model"); // Assuming you have a User model defined

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

      // Check if the user already exists in your database
      const existingUser = await User.findOne({ googleId: profile.id });

      if (existingUser) {
        // User already exists, no need to create a new one
        return done(null, existingUser);
      }

      // User does not exist, create a new user
      const newUser = new User({
        userId: profile.id,
        username: profile.displayName,
      });

      // Save the new user to the database
      const savedUser = await newUser.save();

      // Pass the user to the done callback
      done(null, savedUser);
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser(async (id, done) => {
  const user = await User.findById(id);
  done(null, user);
});

module.exports = passport;
