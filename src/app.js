const express = require("express");
const connectDB = require("./Config/database");
const User = require("./Models/users");

const app = express();

app.use(express.json());

app.post("/signup", async (req, res) => {
  //  console.log(req.body);

  const user = new User(req.body);
  try {
    await user.save();
    res.send("Data Added successfully!");
  } catch (err) {
    res.status(400).send("Bad Request: " + err.message);
  }
});

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
  try{
    const users = await User.find({});
    res.send(users);
  } catch(err) {
    res.status(400).send("Something went wrong");
  }
});

app.delete("/user", async (req, res) => {
  try{
    const userId = req.body.userId;
   const user = await User.findByIdAndDelete(userId);
   res.send("User Deleted successfully");
  } catch(err){
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
