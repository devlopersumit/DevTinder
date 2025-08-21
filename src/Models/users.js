const mongoose = require("mongoose");
const validator = require("validator");

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
    trim:true,
    validate(value) {
      if(!validator.isEmail(value)) {
        throw new Error("Invalid Email Address");
      }
    }

  },
  password: {
    type: String,
    required:true,
    trim:true,
    minLength:8,
    maxLength:20,
    validate(value) {
      if(!validator.isStrongPassword(value)) {
        throw new Error("Enter strong password "+ value);
      }
    }
  },
  age: {
    type: Number,
    minLength:14,
    maxLength:80
  },
  gender: {
    type: String,
    validate(value) {
      if(!["male", "female", "others"].includes(value)) {
         throw new Error("Gender is not valid");
      }
    },
    lowercase:true
  },
  photoUrl: {
    type: String,
    validate(value) {
      if(!validator.isURL(value)) {
        throw new Error("Invalid Photo URL" + value);
      }
    }
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


