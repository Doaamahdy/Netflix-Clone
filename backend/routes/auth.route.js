const express = require("express");
const router = express.Router();

const {
  login,
  signup,
  logout,
  authCheck,
} = require("../controllers/authController");
const protectRoute = require("../middlewares/protectRoute");
router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);
router.get("/authCheck", protectRoute, authCheck);
module.exports = router;
