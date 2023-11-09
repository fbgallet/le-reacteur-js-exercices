const User = require("../models/User");

const isAuthenticated = async (req, res, next) => {
  // console.log(req.headers.authorization);
  const token = req.headers.authorization.replace("Bearer ", "");
  // une fois le token "délesté" de "Bearer ", vous pouvez recherché votre utilisateur dans la BDD grâce à un petit findOne :
  const user = await User.findOne({ token: token });
  if (user) {
    req.user = user;
    console.log("Authorized");
    next();
  } else {
    return res.status(401).json("Unauthorized");
  }
};

module.exports = isAuthenticated;
