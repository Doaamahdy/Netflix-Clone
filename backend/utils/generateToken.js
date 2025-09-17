const jwt = require("jsonwebtoken");
const enVars = require("../config/enVars");

const genrateTokenAndSetCookie = async (id, res) => {
  const token = jwt.sign({ id: id }, enVars.JWT_SECRET, {
    expiresIn: "15d",
  });
  res.cookie("jwt-netflix", token, {
    maxAge: 15 * 24 * 60 * 60 * 1000,
    httpOnly:true, // prevent XSS attacks
    sameSite:"strict",
    secure: enVars.NODE_ENV !=="development"
  });
  return token;
};

module.exports = genrateTokenAndSetCookie ;
