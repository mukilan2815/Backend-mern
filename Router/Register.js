const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const Register = require("../Model/Register");
router.post("/register", async (req, res) => {
  try {
    const {
      email,
      password,
      firstName,
      lastName,
      address,
      city,
      state,
      zip,
      phone,
      country,
    } = req.body;
    const existingUser = await Register.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ email: "Email already exists" });
    }
    const newUser = new Register({
      email,
      password,
      firstName,
      lastName,
      address,
      city,
      state,
      zip,
      phone,
      country,
    });
    const savedUser = await newUser.save();
    const token = jwt.sign({ userId: savedUser._id }, process.env.JWT_SECRET, {
      expiresIn: "4h",
    });
    res.status(200).json({
      message: "User created successful",
      userId: savedUser._id,
      token,
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
router.get("/user/:userId", async (req, res) => {
  try {
    const user = await Register.findById(req.params.userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
module.exports = router;
