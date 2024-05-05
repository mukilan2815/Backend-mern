const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
  },
  imageUrl: {
    type: String,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  reviews: {
    type: [
      {
        type: Schema.Types.ObjectId,
        ref: "Review",
      },
    ],
    default: [],
  },
  rating: {
    type: Number,
    default: 0,
  },
  category: {
    type: String,
  },
  quantity: {
    type: Number,
  },
  sold: {
    type: Number,
    default: 0,
  },
  brand: {
    type: String,
  },
  color: {
    type: String,
  },
  size: {
    type: String,
  },
  discount: {
    type: Number,
    default: 0,
  },
  freeshipping: {
    type: Boolean,
    default: false,
  },
  featured: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("Product", productSchema);
