const validator = require("validator");

const validateSignupData = (req) => {
  const { firstName, lastName, email, password } = req.body;

  if (!firstName || !lastName || !email || !password) {
    throw new Error("All fields are required");
  } else if (firstName.length < 3 || firstName.length > 50) {
    throw new Error("First Name must be lie between 4-50 character");
  } else if (firstName.length < 3 || firstName.length > 20) {
    throw new Error("Last Name must be lie between 4-20 character");
  } else if (!validator.isEmail(email.trim())) {
    throw new Error("Email is not valid");
  } else if (!validator.isStrongPassword(password)) {
    throw new Error("Please enter a strong password");
  }
};

const validateEditProfileData = (req) => {
  const allowedEditFields = [
    "firstName",
    "lastName",
    "photoUrl",
    "gender",
    "about",
    "skills",
    "age",
  ];

  const isEditAllowed = Object.keys(req.body).every((field) => allowedEditFields.includes(field));
  return isEditAllowed;
};

module.exports = {
  validateSignupData, validateEditProfileData,
};
