const router = require("express").Router();
const passport = require("passport");

// auth login
router.get("/login", (req, res) => {
  res.render("login");
});

// auth loggout
router.get("/logout", (req, res) => {
  // handle with passport
  res.send("Logging Out");
});

// auth with google
router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

// callback route for google to redirect
router.get("/google/redirect", passport.authenticate("google"), (req, res) => {
  res.send("auth as been redirected");
});

module.exports = router;
