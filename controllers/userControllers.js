const User = require("../models/user");
const asyncHandler = require("../middleware/asyncHandler");

exports.getCurrentUser = asyncHandler(async (req, res, next) => {
  res.send(req.user);
});
exports.createUser = asyncHandler(async (req, res, next) => {
  const user = new User(req.body);
  const token = await user.newAuthToken();
  res.status(201).send({ user, token });
});
exports.loginUser = asyncHandler(async (req, res, next) => {
  const user = await User.checkValidCredentials(
    req.body.email,
    req.body.password
  );
  const token = await user.newAuthToken();
  res.send({ user, token });
});
exports.logoutUser = asyncHandler(async (req, res, next) => {
  req.user.tokens = [];
  await req.user.save();
  res.send({ success: "ok", data: "logout successful" });
});
