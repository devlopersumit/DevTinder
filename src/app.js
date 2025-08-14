const express = require('express');

const app = express();

app.use("/about",(req, res) => {
    res.send("Kya bolti public")
});

app.use("/contact",(req, res) => {
    res.send("My Contact number is 9876543210")
});

app.use("/",(req, res) => {
    res.send("Amma behen pe aa jaunga mai")
});

app.listen(4000, () => {
    console.log("Server is running perfectly on port 4000");
    
});

