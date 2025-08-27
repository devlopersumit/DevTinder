const express = require("express");
const authRouter = express.Router();

//signup api
authRouter.post("/signup", async (req, res) => {
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

module.exports = authRouter;