const express = require("express");
const router = express.Router();
const uploadImage = require("../upload/uploadImage");
const authenticate = require("../middleware/auth");
const {
  getCurrentUser,
  createUser,
  loginUser,
  logoutUser,
  changeProfileImage,
} = require("../controllers/userControllers");
router.route("/profile").get(authenticate, getCurrentUser);
router.route("/add").post(createUser);
router.route("/login").post(loginUser);
router.route("/logout").post(authenticate, logoutUser);
router.route("/changeProfileImage").post(
  authenticate,
  uploadImage.single("image"),
  (req, res, next) => {
    if (!req.file) {
      req.body.image = null;
    } else {
      // req.body.image = req.file.filename;
      req.body.image = req.file.path.replace(/\\/g, "/").substring(6);
    }
    next();
  },
  changeProfileImage
);

module.exports = router;
