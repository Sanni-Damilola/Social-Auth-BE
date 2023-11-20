const router = require("express").Router();
const passport = require("passport-google-oauth20");

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
router.get("/google",);

module.exports = router;
