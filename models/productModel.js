const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
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
      type: mongoose.Types.ObjectId,
      ref: "Categories",
    },
    subCategory: {
      type: mongoose.Types.ObjectId,
      ref: "SubCategory",
    },
    subSubCategory: {
      type: mongoose.Types.ObjectId,
      ref: "SubSubCategory",
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
    variants: {
      type: Array,
    },
    rating: {
      type: Number,
      default: 0,
    },
    reviewer: {
      type: Number,
      default: 0,
    },
    featured: {
      type: Boolean,
    },
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
