const express = require("express");
const connectDB = require("./Config/database");
const cookieParser = require("cookie-parser");
const cors = require('cors')

const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());

const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const requestRouter = require("./routes/request");
const userRouter = require("./routes/user");

app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);
app.use("/", userRouter);

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
