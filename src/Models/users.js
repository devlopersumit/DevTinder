const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    minLength:3,
    maxLength:50,
    trim:true
  },
  lastName: {
    type: String,
    minLength:3,
    maxLength:20,
    trim:true
  },
  email: {
    type: String,
    required:true,
    unique: true,
    lowercase:true,
    trim:true

  },
  password: {
    type: String,
    required:true,
    trim:true,
    minLength:6,
    maxLength:20
  },
  age: {
    type: Number,
    minLength:14
  },
  gender: {
    type: String,
    validate(value) {
      if(!["male", "female", "others"].includes(value)) {
         throw new Error("Gender is not valid");
      }
    }
  },
  photoUrl: {
    type: String
  },
  about:{
    type:String
  },
  skills:{
    type:[String]
  }

}, {
  timestamps:true
});


module.exports = mongoose.model("User", userSchema);


