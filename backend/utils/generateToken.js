const jwt = require("jsonwebtoken");
const envVars = require("../config/envVars");

const genrateTokenAndSetCookie = async (id, res) => {
  const token = jwt.sign({ id: id }, envVars.JWT_SECRET, {
    expiresIn: "15d",
  });
  res.cookie("jwt-netflix", token, {
    maxAge: 15 * 24 * 60 * 60 * 1000,
    httpOnly:true, // prevent XSS attacks
    sameSite:"strict",
    secure: envVars.NODE_ENV !=="development"
  });
  return token;
};

module.exports = genrateTokenAndSetCookie ;
