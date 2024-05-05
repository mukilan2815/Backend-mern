const express = require("express");
const router = express.Router();
const product = require("../Model/Products");

router.get("/products", async (req, res) => {
  try {
    const searchQuery = req.params.searchquery;
    const products = await product.find({
      name: { $regex: searchQuery, $options: "i" },
    });
    res.json(products);
  } catch (error) {
    res.json({ message: error });
  }
});

router.post("/product", async (req, res) => {
  const newProduct = new product({
    name: req.body.name,
    price: req.body.price,
    description: req.body.description,
    imageUrl: req.body.imageUrl,
    userId: req.body.userId,
    category: req.body.category,
    quantity: req.body.quantity,
    brand: req.body.brand,
    color: req.body.color,
    size: req.body.size,
    discount: req.body.discount,
    freeshipping: req.body.freeshipping,
    featured: req.body.featured,
    createdAt: Date.now(),
    updatedAt: Date.now(),
    reviews: [],
    rating: 0,
    sold: 0,
  });
  try {
    const savedProduct = await newProduct.save();
    res.json(savedProduct);
  } catch (error) {
    res.json({ message: error });
  }
});

exports.router = router;