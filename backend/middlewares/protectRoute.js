const jwt = require("jsonwebtoken");
const envVars = require("../config/envVars");
const User = require("../models/user");

const protectRoute = async (req, res, next) => {
  try {
    const token = req.cookies["jwt-netflix"];
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "unauthorized - no token provided",
      });
    }
    const decoded = jwt.verify(token, envVars.JWT_SECRET);
    if (!decoded) {
      return res.status(401).json({
        success: false,
        message: "unauthorized - Invalid provided",
      });
    }
    const user = await User.findById(decoded.id).select("-password");
    if (!user) {
      return res.status(404).json({
        success: "false",
        message: "User Not Found",
      });
    }
    req.user = user;
    next();
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

module.exports = protectRoute;
