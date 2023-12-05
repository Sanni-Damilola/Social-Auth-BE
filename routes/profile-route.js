const profileRouter = require("express").Router();

profileRouter.get("/", (req, res) => {
  res.send(
    "Successfully Logged In, This is Your Profile Page - " + req.user?.username
  );
});

module.exports = profileRouter;
