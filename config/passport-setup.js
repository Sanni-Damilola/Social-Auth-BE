const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20");
const keys = require("./keys");
const User = require("../model/user-model"); // Assuming you have a User model defined

// store the user id
passport.serializeUser((user, done) => {
  console.log("User".user);
  done(Error | null, user?.id);
});

// 

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
      const existingUser = await User.findOne({ googleID: profile.id });

      if (existingUser) {
        // User already exists, no need to create a new one
        return done(Error | null, existingUser);
      }

      // User does not exist, create a new user
      const newUser = new User({
        googleId: profile.id,
        username: profile.displayName,
        email: profile.emails[0].value,
      });

      // Save the new user to the database
      const savedUser = await newUser.save();
      done(Error | null, newUser);

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
