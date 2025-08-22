const validator = require("validator");
const validateSignupData = (req) => {
  const { firstName, lastName, email, password } = req.body;

  if (!firstName || !lastName || !email || !password) {
    throw new Error("All fields are required");
  } else if (firstName.length < 3 || firstName.length > 50) {
    throw new Error("First Name must be lie between 4-50 character");
  } else if (firstName.length < 3 || firstName.length > 20) {
    throw new Error("Last Name must be lie between 4-20 character");
  } else if (!validator.isEmail(email)) {
    throw new Error("Email is not valid");
  } else if (!validator.isStrongPassword(password)) {
    throw new Error("Please enter a strong password");
  }
};

module.exports = {
    validateSignupData
}
