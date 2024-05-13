const express = require("express");
const router = express.Router();
const product = require("../Model/Products");

router.get("/products", async (req, res) => {
  try {
    const products = await product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
    console.error(error);
  }
});

router.get("/products/:searchname", async (req, res) => {
  try {
    const searchName = req.params.searchname;
    let products;

    if (searchName) {
      products = await product.find({
        name: { $regex: searchName, $options: "i" },
      });
    } else {
      products = await product.find();
    }

    res.json(products);
    console.log("products", products);
    console.log("searchName", searchName);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
    console.error(error);
  }
});

router.post("/products", async (req, res) => {
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

router.get("/singleproduct/:id", async (req, res) => {
  try {
    const singleProduct = await product.findById(req.params.id);
    res.json(singleProduct);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
    console.error(error);
  }
});

module.exports = router;
