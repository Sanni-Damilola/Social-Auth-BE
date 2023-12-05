const express = require("express");
const authRoutes = require("./routes/auth-routes");
const passport = require("./config/passport-setup");
const mongoose = require("mongoose");
const cookieSession = require("cookie-session");
const { keysForCookies, dbUrl } = require("./config/keys");
const app = express();

app.set("view engine", "ejs");

// maxAge is set to 24 hours in milliseconds
app.use(cookieSession({ maxAge: 24 * 60 * 60 * 1000, keys: [keysForCookies] }));

// Initialize Passport and use it for session management
app.use(passport.initialize());
app.use(passport.session());

// Connect to MongoDB
mongoose
  .connect(dbUrl)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Error in MongoDB connection:", err));

// Set up routes for authentication
app.use("/auth", authRoutes);

// Define a simple route for the home page
app.get("/", (req, res) => {
  res.render("home");
});

// Start the server on port 3000
app.listen(3000, () => {
  console.log("App is listening on port 3000");
});
