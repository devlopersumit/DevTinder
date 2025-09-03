const express = require("express");
const { userAuth } = require("../middlewares/userAuth");
const ConnectionRequestModel = require("../Models/coonectionRequest");
const userRouter = express.Router();

//Get all the pending connection request for the loggedIn user
userRouter.get("/user/request/received", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;

    const connectionRequest = await ConnectionRequestModel.find({
      toUserId: loggedInUser._id,
      status: "interested",
    }).populate("fromUserId", "firstName lastName photoUrl gender age");

    res.json({
      message: "request fetched succefully",
      data: connectionRequest,
    });
  } catch (err) {
    res.status(400).send("Error: " + err.message);
  }
});

module.exports = userRouter;
