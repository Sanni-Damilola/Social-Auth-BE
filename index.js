const express = require("express");
const authRoutes = require("./routes/auth-routes");
const session = require("express-session");
const passport = require("passport");
const mongoose = require("mongoose");
const pasportsetup = require("./config/passport-setup");
const generateRandomSecret = require("./utils/generate-secret");
const app = express();

// set up view engine
app.set("view engine", "ejs");
const generatedSecret = generateRandomSecret();

// create a connection to mongodb
const dbUri = "mongodb://0.0.0.0:27017/socialauth";
mongoose
  .connect(dbUri)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Error in MongoDB connection:", err));

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

app.listen(4000, () => {
  console.log("App is listening on port ", 4000);
});
