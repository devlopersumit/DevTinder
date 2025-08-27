const express = require("express");
const { userAuth } = require("../middlewares/userAuth");

const requestRouter = express.Router();

requestRouter.post("/sendConnectionRequest", userAuth, async (req, res) => {
  
  //Sending a connection request
  const user = req.user;
  console.log("sending a connection request");
  res.send(user.firstName + " " + user.lastName + " sent a connection request");
  
});

module.exports = requestRouter;