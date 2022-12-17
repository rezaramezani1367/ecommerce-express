const express = require("express");
const router = express.Router();
const authenticate = require("../middleware/auth");
const {
  getCurrentUser,
  createUser,
  loginUser,
  logoutUser,
} = require("../controllers/userControllers");
router.route("/profile").get(authenticate, getCurrentUser);
router.route("/add").post(createUser);
router.route("/login").post(loginUser);
router.route("/logout").post(authenticate,logoutUser);

module.exports = router;
