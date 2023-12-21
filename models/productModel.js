const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    required: true,
    unique: true,
  },
  image: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  discount: {
    type: Number,
  },
  brand: {
    type: String,
  },
}, { timestamps: true });

const Product = mongoose.model('Product', ProductSchema);

module.exports = Product;