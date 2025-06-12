const User = require("../models/user");
const genrateTokenAndSetCookie = require("../utils/generateToken");
const login = async (req, res) => {
  console.log("login called");
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ success: "false", message: "Internal Server Error" });
    }

    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res
        .status(404)
        .json({ success: "fail", message: "Invalid Credientials" });
    }

    const isValidPassword = await existingUser.comparePassword(password);
    if (!isValidPassword) {
      return res
        .status(404)
        .json({ success: "fail", message: "Invalid Credientials" });
    }
    genrateTokenAndSetCookie(existingUser._id, res);
    return res.status(200).json({
      success: "true",
      user: {
        ...existingUser._doc,
        password: "",
      },
    });
  } catch (err) {
    res.status(500).json({
      success: "false",
      message: "Internal Server Error",
    });
  }
};
const signup = async (req, res) => {
  try {
    const { email, password, username } = req.body;
    if (!email || !password || !username) {
      return res.status(400).json({
        success: "false",
        message: "All fields are required",
      });
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res
        .status(400)
        .json({ success: "false", message: "Invalid email" });
    }
    if (password.length < 6) {
      return res.status(400).json({
        success: "false",
        message: "password must be at least 6 characters",
      });
    }
    const existingUSerByEmail = await User.findOne({ username });
    if (existingUSerByEmail) {
      return res
        .status(400)
        .json({ success: "false", message: "username already exists!" });
    }
    const existingUSerByUsername = await User.findOne({ email });
    if (existingUSerByUsername) {
      return res
        .status(400)
        .json({ success: "false", message: "email already exists!" });
    }
    const PROFILE_PICS = ["/avatar1.png", "/avatar2.jpg", "/avatar3.png"];
    const image = PROFILE_PICS[Math.floor(Math.random() * PROFILE_PICS.length)];

    let newUser = await User({
      email,
      password,
      username,
      image,
    });
    var token = await genrateTokenAndSetCookie(newUser._id, res);
    newUser = await newUser.save();
    return res.status(201).json({
      success: "true",
      user: {
        ...newUser._doc,
        password: "",
      },
    });
  } catch (err) {
    res.status(500).json({ success: "false", message: err.message });
  }
};
const logout = async (req, res) => {
  try {
    res.clearCookie("jwt-netflix");
    res.status(200).json({ success: true, message: "Logged out successfully" });
  } catch (err) {
    res
      .status(500)
      .json({ success: "false", message: "Internal Server Error" });
  }
};

const authCheck = async (req, res) => {
  try {
    return res.status(200).json({
      success: "true",
      user: req.user,
    });
  } catch (err) {
    return res.status(500).json({
      success: "false",
      message: "Internal Server Error",
    });
  }
};

module.exports = {
  login,
  signup,
  logout,
  authCheck,
};
