const express = require("express");
const router = express.Router();
const { Product } = require("../Model/Products");

router.post("/addcart/id", async (req, res) => {
    try {
      
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/cart", (req, res) => {
  res.json(req.session.cart || []);
});

router.delete("/cart/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const cart = req.session.cart || [];
    const index = cart.findIndex((product) => product._id === id);
    if (index === -1) {
      return res.status(404).json({ message: "Product not found" });
    }
    cart.splice(index, 1);
    req.session.cart = cart;
    res.json({ message: "Product removed from cart" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
