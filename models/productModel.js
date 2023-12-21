const mongoose = require("mongoose");

const VariantSchema = {
  size: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    required: true,
  },
  colorCode: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
};

const ProductSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    discount: {
      type: Number,
    },
    totalStock: {
      type: Number,
      required: true,
    },
    brand: {
      type: String,
    },
    description: {
      type: String,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    image: {
      type: String,
    },
    variants: [VariantSchema],
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", ProductSchema);

module.exports = Product;
