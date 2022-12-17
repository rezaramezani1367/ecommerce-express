const express = require("express");
const router = express.Router();
const {
  getCurrentUser,
  createUser,
  loginUser,
} = require("../controllers/userControllers");
// router.route("/profile").get(getCurrentUser);
// router.route("/add").post(createUser);
// router.route("/login").post(loginUser);

module.exports = router;
