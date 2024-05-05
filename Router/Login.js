const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Register = require("../Model/Register");
const dotenv = require("dotenv");

dotenv.config();
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await Register.findOne({ email });
    if (!user) {
      return res.status(404).json({ email: "User not found" });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ password: "Incorrect password" });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "4h",
    });

    res
      .status(200)
      .json({ message: "Login successful", userId: user._id, token });
    console.log("Login successful", token);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
