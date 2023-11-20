const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20");
const keys = require("./keys");

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
      return done(null, profile?.email);
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
