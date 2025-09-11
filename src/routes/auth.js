const express = require("express");
const { validateSignupData } = require("../utils/validation");
const validator = require("validator");
const bcrypt = require("bcrypt");
const User = require("../Models/users");
const jwt = require("jsonwebtoken");

const authRouter = express.Router();

//signup api
authRouter.post("/signup", async (req, res) => {
  const { firstName, lastName, email, password,age, gender, photoUrl,about } = req.body;

  try {
    //Validate the data
    validateSignupData(req);

    const { password } = req.body;

    //Encrypt the password
    const passwordHash = await bcrypt.hash(password, 10);

    const user = new User({
      firstName,
      lastName,
      email,
      password: passwordHash,
      age,
      gender,
      photoUrl,
      about,
    });

    const savedUser = await user.save();

          const token = await jwt.sign({ _id: user._id }, "DEV@Tinder$790", {
        expiresIn: "7d",
      });

      //Add the token to cookie and send the response back to the user
      res.cookie("token", token);
      
    res.send("Data Added successfully!");
  } catch (err) {
    res.status(400).send("Bad Request: " + err.message);
  }
});

//login api
authRouter.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!validator.isEmail(email)) {
      throw new Error("Email Id is not valid");
    }

    const user = await User.findOne({ email: email });

    if (!user) {
      throw new Error("Invalid Credentials");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (isPasswordValid) {
      //Create a JWT Token
      const token = await jwt.sign({ _id: user._id }, "DEV@Tinder$790", {
        expiresIn: "7d",
      });

      //Add the token to cookie and send the response back to the user
      res.cookie("token", token);

      res.send(user);
    } else {
      throw new Error("Invalid Credentials");
    }
  } catch (err) {
    res.status(400).send("Bad Request: " + err.message);
  }
});

//logout api
authRouter.post("/logout", async (req, res) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
  });
  res.send("Log out Successfully!");
});

module.exports = authRouter;
