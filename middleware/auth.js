const jwt = require("jsonwebtoken");
const User = require("../models/user");

const auth = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer", "").trim();

    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    const user = await User.findOne({
      _id: decoded._id,
      "tokens.token": token,
    }).populate({ path: 'profile' });
    // , select: 'city -_id'
     
    if (!user) {
      throw new Error("user authenticate not exists");
    }
    req.token = token;
    req.user = user;
    next();
  } catch (error) {
    console.log(error);
    res.status(401).send({ error: "Please authenticate!" });
  }
};

module.exports = auth;
