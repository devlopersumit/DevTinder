const express = require("express");
const connectDB = require("./Config/database");
const User = require("./Models/users")

const app = express();


app.post("/signup", async(req, res) => {
  const userObj = {
    firstName:"Sumit",
    lastName: "Jha",
    email: "sumit@jha.com",
    password: "sumit@123"
  }

  const user = new User(userObj);
try{
  await user.save();
  res.send("Data Added successfully!")
} catch(err) {
  res.status(400).send("Bad Request: " +err.message);
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
    console.log("Database cannot be established");
  });
