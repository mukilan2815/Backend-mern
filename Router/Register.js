const express = require("express");
const router = express.Router();
const register = require("../Model/Register");
const jwt = require("jsonwebtoken");
router.post("/register", async (req, res) => {
  const {
    email,
    password,
    firstName,
    lastName,
    date,
    address,
    city,
    state,
    zip,
    phone,
    conuntry,
  } = req.body;
  const existingmail = await register.findOne(email);
  if (existingmail) {
    res.send(409).json("Existing user found.");
  }
  const newUser = new register({
    email,
    password,
    firstName,
    lastName,
    date,
    address,
    city,
    state,
    zip,
    phone,
    conuntry,
  });

  const saveduser = newUser.save();
  const token = jwt.sign({ userId: saveduser._id }, process.env.JWT_SECRET, {
    expiresIn: "4h",
  });
  res.send(200).json({
    message: "User created",
    userId: saveduser.__id,
    token,
  });
});

