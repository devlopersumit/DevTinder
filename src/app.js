const express = require("express");
const app = express();

// app.use("/about",(req, res) => {
//     res.send("Kya bolti public")
// });
// app.use("/contact",(req, res) => {
//     res.send("My Contact number is 9876543210")
// });
// app.use("/",(req, res) => {
//     res.send("Amma behen pe aa jaunga mai")
// });

app.get("/user/:userId/:name", (req, res) => {
  console.log(req.params);

  res.send({ fisrtName: "Sumit", lastName: "Jha" });
});

app.post("/user", (req, res) => {
  res.send("Data stored in DB successfully");
});

app.delete("/user", (req, res) => {
  res.send("Data deleted successfully");
});

app.patch("/user", (req, res) => {
  res.send("Updated the database successfully");
});

app.get("/", (req, res) => {
  res.send("Welcome Back!")
});

app.listen(4000, () => {
  console.log("Server is running perfectly on port 4000");
});
