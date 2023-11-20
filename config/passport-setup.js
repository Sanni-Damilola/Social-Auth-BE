const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20");
const keys = require("./keys");

passport.use(
  new GoogleStrategy(
    {
      // Options for Google strategy
      callbackURL: "https://developers.google.com/oauthplayground",
      clientID: keys.google.clientID,
      clientSecret: keys.google.clientSecret,
    },
    (accessToken, refreshToken, profile, done) => {
      // Passport callback function
      console.log("Google Profile:", profile);
      return done(null, profile);
    }
  )
);
