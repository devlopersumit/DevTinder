const express = require("express");
const connectDB = require("./Config/database");
const User = require("./Models/users")

const app = express();

app.use(express.json());

app.post("/signup", async(req, res) => {

   console.log(req.body);

    const user = new User(req.body);
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
    console.log("Database cannot be established " + err.message);
  });
