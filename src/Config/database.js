const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://sumitjha6522:xbl5KwjlPsVf9i5p@cluster0.qjnzqpn.mongodb.net/DevTinder?retryWrites=true&w=majority",
    );
    console.log("✅ MongoDB Atlas connected...");
  } catch (err) {
    console.error("❌ MongoDB connection error:", err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
