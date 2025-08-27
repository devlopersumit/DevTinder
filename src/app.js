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
