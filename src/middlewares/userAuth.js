//User authentication middleware

const jwt = require("jsonwebtoken");
const User = require("../Models/users");

const userAuth = async (req, res, next) => {

  try{
  //read the token from the req cookie
  const { token } = req.cookies;
  if(!token) {
    throw new Error("Token is not valid!!");
  }

  //Validate the token
  const decodedObj = await jwt.verify(token, "DEV@Tinder$790");
  
     const { _id } = decodedObj;
  //Find the user
  const user = await User.findById(_id);
  if(!user) {
    throw new Error("user not found");
  }
  
  req.user = user;
  next();
  }catch(err) {
    res.status(400).send("Error: " + err.message);
  }
}

module.exports = {
    userAuth,
}