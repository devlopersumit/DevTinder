const express = require("express");
const connectDB = require("./Config/database");
const User = require("./Models/users");
const { validateSignupData } = require("./utils/validation");
const bcrypt = require("bcrypt");
const validator = require("validator");

const app = express();

app.use(express.json());

//signup api
app.post("/signup", async (req, res) => {
 const { firstName, lastName, email, password } = req.body;

  try {
    //Validate the data
    validateSignupData(req);

    const { password } = req.body;

    //Encrypt the password

    const passwordHash = await bcrypt.hash(password, 10);
    console.log(passwordHash);

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
  try{
   
    const {email, password} = req.body;
    if(!validator.isEmail(email)) {
      throw new Error("Email Id is not valid");
    }

    const user = await User.findOne({email:email});

    if(!user) {
      throw new Error("Invalid Credentials");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if(isPasswordValid) {
      res.send("Login Successfull");
    }
    else {
      throw new Error("Invalid Credentials");
    }

  } catch (err) {
    res.status(400).send("Bad Request: " + err.message);
  }
})

//GET User by email
app.get("/user", async (req, res) => {
  const userEmail = req.body.email;
  try {
    const user = await User.find({ email: userEmail });
    if (user.length === 0) {
      res.status(404).send("User not found!");
    } else {
      res.send(user);
    }
  } catch (err) {
    res.status(400).send("Something went wrong");
  }
});

//FEED API - GET/feed - get all the users from database
app.get("/feed", async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (err) {
    res.status(400).send("Something went wrong");
  }
});

app.delete("/user", async (req, res) => {
  try {
    const userId = req.body.userId;
    const user = await User.findByIdAndDelete(userId);
    res.send("User Deleted successfully");
  } catch (err) {
    res.status(400).send("Something went wrong");
  }
});

//update data of the user using userId
app.patch("/user/:userId", async (req, res) => {
  const userId = req.params?.userId;
  let data = req.body;

  try {
    const ALLOWED_UPDATES = ["photoUrl", "about", "gender", "age", "skills"];
    const isAllowedUpdates = Object.keys(data).every((k) =>
      ALLOWED_UPDATES.includes(k)
    );

    if (!isAllowedUpdates) {
      throw new Error("Update not allowed");
    }

    // Remove duplicates from skills array if present
    if (Array.isArray(data.skills)) {
      data.skills = [...new Set(data.skills)];
    }

    if (data?.skills.length > 10) {
      throw new Error("Skills cannot be more than 10");
    }

    const updatedUser = await User.findByIdAndUpdate(userId, data, {
      new: true,
      runValidators: true,
    });
    if (!updatedUser) {
      return res.status(404).send("User not found!");
    }
    res.send("User Updated successfully");
  } catch (err) {
    res.status(400).send("Update Failed " + err.message);
  }
});

//update data of the user using email
app.patch("/user", async (req, res) => {
  const emailId = req.body.email;
  const data = { ...req.body };
  delete data.email; // Prevent overwriting the email field

  // Remove duplicates from skills array if present
  if (Array.isArray(data.skills)) {
    data.skills = [...new Set(data.skills)];
  }

  try {
    const updatedUser = await User.findOneAndUpdate({ email: emailId }, data, {
      new: true,
    });
    if (!updatedUser) {
      return res.status(404).send("User not found!");
    }
    res.send("User updated successfully using emailId");
  } catch (err) {
    res.status(400).send("Something went wrong");
  }
});

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
