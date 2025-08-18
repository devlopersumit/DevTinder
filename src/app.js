const express = require("express");
const app = express();


app.get("/", (req, res, next) => {
  // res.send("Welcome Back!")
  next();
});

app.get("/", (req, res) => {
  res.send("Sumit is best!!!")
})

app.listen(4000, () => {
  console.log("Server is running perfectly on port 4000");
});
