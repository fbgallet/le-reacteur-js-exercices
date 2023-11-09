const express = require("express");
const router = express.Router();
const uid2 = require("uid2");
const encBase64 = require("crypto-js/enc-base64");
const SHA256 = require("crypto-js/sha256");
const emailRegex = /^[\w\-\.]+@[\w-]+\.+[\w-]{2,9}$/;

const User = require("../models/User");

// Display availabilities for a given day
router.post("/user/signup", async (req, res) => {
  try {
    const { username, email, password, newsletter } = req.body;
    if (!username) {
      res.status(400).json({ message: "User name not provided." });
      return;
    }
    if (!isValidEmail(email)) {
      res.status(400).json({ message: "email invalid." });
      return;
    }
    if (!(await isNewUser(username, email))) {
      res
        .status(400)
        .json({ message: "This user exist already. Try to login." });
      return;
    }
    let salt = generateSalt();
    const newUser = await User({
      email: email,
      account: {
        username: username,
        //  avatar: Object, // nous verrons plus tard comment uploader une image
      },
      newsletter: newsletter,
      token: generateToken(),
      hash: generateHash(salt, password),
      salt: salt,
    });
    newUser.save();
    res.status(200).json({
      message: "New user created:",
      user: {
        _id: newUser._id,
        token: newUser.token,
        account: {
          username: newUser.account.username,
        },
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/user/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      res
        .status(400)
        .json({ message: "Email and password have to be provided." });
      return;
    }
    const user = await User.findOne({ email: email });
    if (!user) {
      res
        .status(400)
        .json({ message: "This user doesn't exist. Sign up before to login." });
      return;
    }
    if (!isPasswordMatching(password, user)) {
      res.status(400).json({ message: "Wrong password!" });
      return;
    }
    res.status(200).json({ message: "User logged in!", user: user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

async function isNewUser(username, email) {
  const userByName = await User.findOne({ account: { username: username } });
  const userByMail = await User.findOne({ email: email });
  if (userByName || userByMail) return false;
  return true;
}
function generateSalt() {
  return uid2(24);
}
function generateHash(salt, password) {
  return SHA256(password + salt).toString(encBase64);
}
function generateToken() {
  return uid2(16);
}
function isPasswordMatching(password, user) {
  let hash = generateHash(user.salt, password);
  if (hash === user.hash) return true;
  return false;
}
function isValidEmail(email) {
  return (test = emailRegex.test(email));
}

module.exports = router;
