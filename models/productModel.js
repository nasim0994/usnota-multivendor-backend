const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  images: [String],
  title: String,
  category: String,
  brand: String,
  stock: Number,
  sellPrice: Number,
  purchasePrice: Number,
  description: String,
  formData: [
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
