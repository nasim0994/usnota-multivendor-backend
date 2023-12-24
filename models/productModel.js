const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  images: [String],
  title: String,
  category: String,
  brand: String,
  stock: Number,
  sellPrice: Number,
  purchasePrice: Number,
  discount: {
    type: Number,
    default: 0,
  },
  description: String,
  varients: [
    {
      color: String,
      colorCode: String,
      info: [
        {
          size: String,
          quantity: Number,
          price: Number,
        },
      ],
    },
  ],
  colors: [
    {
      name: String,
      code: String,
    },
  ],
  sizes: [String],
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
