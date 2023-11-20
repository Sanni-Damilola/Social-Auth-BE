const express = require("express");
const authRoutes = require("./routes/auth-routes");
const session = require("express-session");
const passport = require("passport");
const pasportsetup = require("./config/passport-setup");
const generateRandomSecret = require("./utils/generate-secret");
const app = express();
require("./config/db");
// set up view engine
app.set("view engine", "ejs");
const generatedSecret = generateRandomSecret();

app.use(
  session({
    secret: generatedSecret,
    resave: true,
    saveUninitialized: true,
  })
);

app.use(passport.initialize());
app.use(passport.session());

// set up routes
app.use("/auth", authRoutes);

app.get("/", (req, res) => {
  res.render("home");
});

app.listen(3000, () => {
  console.log("App is Listening to ", 3000);
});
