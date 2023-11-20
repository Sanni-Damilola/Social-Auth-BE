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
const dbOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const db = mongoose.createConnection(dbUri, dbOptions);

db.on("error", (err) => {
  console.error("Error in MongoDB connection:", err);
});

db.once("open", () => {
  console.log("Connected to MongoDB");
});

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
  console.log("App is listening on port 3000");
});
