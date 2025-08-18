const express = require("express");
const {adminAuth} = require("./middlewares/adminAuth");
const {userAuth} = require("./middlewares/userAuth");

const app = express();
 app.use(express.json());

app.use("/admin", adminAuth)

app.get("/admin/getAllData", (req, res) => {
  console.log("Sending your all data");
  res.send("Data has sent")
});

app.post("/admin/updateData", (req, res) => {
  console.log("Updata the data...");
  res.send("Data has updated")
});

app.get("/user/getUser", userAuth, (req, res) => {
  res.send("Sending data...")
})

app.get("/user/login",(req, res) => {
  res.send("Logging in...")
})

app.listen(4000, () => {
  console.log("Server is running perfectly on port 4000");
});
