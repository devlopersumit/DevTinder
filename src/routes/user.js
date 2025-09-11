const express = require("express");
const { userAuth } = require("../middlewares/userAuth");
const ConnectionRequestModel = require("../Models/coonectionRequest");
const { set } = require("mongoose");
const userRouter = express.Router();
const User = require("../Models/users");
const USER_SAFE_DATA = "firstName lastName photoUrl gender age about"

//Get all the pending connection request for the loggedIn user
userRouter.get("/user/request/received", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;

    const connectionRequest = await ConnectionRequestModel.find({
      toUserId: loggedInUser._id,
      status: "interested",
    }).populate("fromUserId", USER_SAFE_DATA);

    res.json({
      message: "request fetched succefully",
      data: connectionRequest,
    });
  } catch (err) {
    res.status(400).send("Error: " + err.message);
  }
});

userRouter.get("/user/connections", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;

    const connectionRequest = await ConnectionRequestModel.find({
      $or: [
        {
          toUserId: loggedInUser._id,
          status: "accepted",
        },
        {
          fromUserId: loggedInUser._id,
          status: "accepted",
        },
      ],
    })
      .populate("fromUserId", USER_SAFE_DATA)
      .populate("toUserId", USER_SAFE_DATA);

    // Filter out requests with missing users
    const data = connectionRequest
      .map((row) => {
        if (!row.fromUserId || !row.toUserId) return null; // skip broken references

        if (row.fromUserId._id.toString() === loggedInUser._id.toString()) {
          return row.toUserId;
        }
        return row.fromUserId;
      })
      .filter((user) => user !== null); // remove nulls safely

    res.json({ data });
  } catch (err) {
    res.status(400).send("Error: " + err.message);
  }
});


//Feed API
userRouter.get("/feed", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;
    const page = parseInt(req.query.page) || 1;
    let limit = parseInt(req.query.limit) || 10;
    limit = limit > 50 ? 50 : limit;
    const skip = (page - 1) * limit;

    // Get all connection requests involving the logged-in user
    const connectionRequest = await ConnectionRequestModel.find({
      $or: [
        { fromUserId: loggedInUser._id },
        { toUserId: loggedInUser._id }
      ],
    }).select("fromUserId toUserId");

    const hideUsersFromFeed = new Set();
    connectionRequest.forEach(req => {
      hideUsersFromFeed.add(req.fromUserId.toString());
      hideUsersFromFeed.add(req.toUserId.toString());
    });

    // Always exclude self
    hideUsersFromFeed.add(loggedInUser._id.toString());

    // Fetch users excluding hidden ones
    let users = await User.find({
      _id: { $nin: Array.from(hideUsersFromFeed) }
    }).select(USER_SAFE_DATA).skip(skip).limit(limit);

    // If no users found, return some placeholder/dummy cards
    if (users.length === 0) {
      const dummyUsers = await User.find({
        _id: { $ne: loggedInUser._id } // exclude self
      }).select(USER_SAFE_DATA).limit(limit);

      users = dummyUsers;
    }

    res.json({ data: users });
  } catch (err) {
    res.status(400).send("Error: " + err.message);
  }
});


module.exports = userRouter;
