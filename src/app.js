const express = require("express");
const connectDB = require("./Config/database");
const User = require("./Models/users");
const { validateSignupData } = require("./utils/validation");
const bcrypt = require("bcrypt");
const validator = require("validator");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const { userAuth } = require("./middlewares/userAuth");

const app = express();

app.use(express.json());
app.use(cookieParser());

//signup api
app.post("/signup", async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  try {
    //Validate the data
    validateSignupData(req);

    const { password } = req.body;

    //Encrypt the password

    const passwordHash = await bcrypt.hash(password, 10);
    // console.log(passwordHash);

    const user = new User({
      firstName,
      lastName,
      email,
      password: passwordHash,
    });

    await user.save();
    res.send("Data Added successfully!");
  } catch (err) {
    res.status(400).send("Bad Request: " + err.message);
  }
});

//login api
app.post("/login", async (req, res) => {
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

      const token = await user.getJWT();
      // const token = await jwt.sign({ _id: user._id }, "DEV@Tinder$790", {expiresIn:'7d'});
      // console.log(token);

      //Add the token to cookie and send the response back to the user
      res.cookie("token", token);

      res.send("Login Successfull");
    } else {
      throw new Error("Invalid Credentials");
    }
  } catch (err) {
    res.status(400).send("Bad Request: " + err.message);
  }
});

//profile api
app.get("/profile", userAuth, async (req, res) => {
  try {
    const user = req.user;
    res.send(user);
  } catch (err) {
    res.status(400).send("Error: " + err.message);
  }
});

app.post("/sendConnectionRequest", userAuth, async (req, res) => {
  
  //Sending a connection request
  const user = req.user;
  console.log("sending a connection request");
  res.send(user.firstName + " " + user.lastName + " sent a connection request");
  
})

connectDB()
  .then(() => {
    console.log("Database connection is established");
    app.listen(4000, () => {
      console.log("Server is running perfectly on port 4000");
    });
  })
  .catch((err) => {
    console.log("Database cannot be established " + err.message);
  });
