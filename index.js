const express = require("express");
const authRoutes = require("./routes/auth-routes");
const pasportsetup = require("./config/passport-setup");
const app = express();

// set up view engine
app.set("view engine", "ejs");

// set up routes
app.use("/auth", authRoutes);

app.get("/", (req, res) => {
  res.render("home");
});

app.listen(3000, () => {
  console.log("App is Listening to ", 3000);
});
