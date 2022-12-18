const User = require("../models/user");
const asyncHandler = require("../middleware/asyncHandler");
const Profile = require("../models/Profile");

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
exports.changeProfileImage = asyncHandler(async (req, res, next) => {
  await User.findByIdAndUpdate(
    req.user._id,
    { image: req.body.image },
   
  );
  // console.log(await User.find({ _id: req.user._id }));
  res.send(await User.findOne({ _id: req.user._id }));
});
exports.changeProfile = asyncHandler(async (req, res, next) => {
  const profile = new Profile(req.body);
  profile.save();
  await User.findByIdAndUpdate(
    req.user._id,
    { profile: profile._id },
    
  );
  // console.log(await User.find({ _id: req.user._id }));
  res.send(await User.findOne({ _id: req.user._id }));
});
