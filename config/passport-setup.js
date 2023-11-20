const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20");
const keys = require("./keys");
const user = require("../model/user-model");

passport.use(
  new GoogleStrategy(
    {
      // Options for Google strategy
      callbackURL: "/auth/google/redirect",
      clientID: keys.google.clientID,
      clientSecret: keys.google.clientSecret,
    },
    (accessToken, refreshToken, profile, done) => {
      // Passport callback function
      console.log("Google Profile:", profile);
      new user({
        username: profile?.displayName,
        userId: profile?.id,
      }).save().then(());
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

module.exports = passport;
