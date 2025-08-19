const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose.connect(
    "mongodb+srv://sumitjha6522:xbl5KwjlPsVf9i5p@cluster0.qjnzqpn.mongodb.net/DevTinder"
  );
};

module.exports = connectDB
