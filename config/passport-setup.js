const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20");
const keys = require("./keys");

function configurePassport(strategy, options) {
  passport.use(
    new strategy(
      {
        ...options,
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          done(null, profile);
        } catch (error) {
          console.error("Error in Passport callback:", error);
          done(error, null);
        }
      }
    )
  );

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (id, done) => {
    try {
      // If you are not storing users in the session, you can simply pass the id to the done callback
      done(null, { id });
    } catch (error) {
      console.error("Error in Passport deserialization:", error);
      done(error, null);
    }
  });

  return passport;
}

module.exports = configurePassport(GoogleStrategy, {
  callbackURL: "/auth/google/redirect",
  clientID: keys.google.clientID,
  clientSecret: keys.google.clientSecret,
});
