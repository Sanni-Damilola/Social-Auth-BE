const profileRouter = require("express").Router();

const authCheck = (req, res, next) => {
  if (!req?.user) {
    //if user is not logged in
    res.redirect("/auth/login");
  } else {
    next();
  }
};

profileRouter.get("/", authCheck, (req, res) => {
  res.send(
    "Successfully Logged In, This is Your Profile Page - " + req.user?.username
  );
});

module.exports = profileRouter;
