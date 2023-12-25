const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  images: [String],
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
  brand: {
    type: String,
    required: true,
  },
  totalStock: {
    type: Number,
    required: true,
  },
  sellPrice: {
    type: Number,
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
  varients: [
    {
      color: {
        type: String,
        required: true,
      },
      colorCode: {
        type: String,
        required: true,
      },
      info: [
        {
          size: {
            type: String,
            required: true,
          },
          quantity: {
            type: Number,
            required: true,
          },
          price: {
            type: Number,
            required: true,
          },
        },
      ],
    },
  ],
  colors: [
    {
      name: {
        type: String,
        required: true,
      },
      code: {
        type: String,
        required: true,
      },
    },
  ],
  sizes: [String],
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
