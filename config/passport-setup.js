const passport = require("passport");

const GoogleStrategy = require("passport-google-oauth20");
const keys = require("./keys");

console.log("c", keys.google.clientID);
console.log("s", keys.google.clientSecret);
passport.use(
  new GoogleStrategy({
    // options for google strategy
    clientID: keys.google.clientID,
    clientSecret: keys.google.clientSecret,
  }),
  () => {
    // pasport callback function
  }
);
