const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  images: {
    type: Array,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    required: true,
    unique: true,
  },
  category: {
    type: String,
    required: true,
  },
  subCategory: {
    type: String,
  },
  subSubCategory: {
    type: String,
  },
  brand: {
    type: String,
    required: true,
  },
  discount: {
    type: Number,
    default: 0,
  },
  description: {
    type: String,
    required: true,
  },
  sellingPrice: {
    type: Number,
  },
  purchasePrice: {
    type: Number,
  },
  quantity: {
    type: Number,
  },
  variants:{
    type: Array,
  },
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
