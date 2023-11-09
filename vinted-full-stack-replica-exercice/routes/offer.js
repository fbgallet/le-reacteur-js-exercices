const express = require("express");
const router = express.Router();

const Offer = require("../models/Offer");
const User = require("../models/User");

router.post("/offer/publish", (req, res) => {
  try {
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
