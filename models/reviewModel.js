const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
  description: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
  user: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: true,
  },
  product: {
    type: mongoose.Types.ObjectId,
    ref: "Product",
    required: true,
  },
});

const Review = mongoose.model("Review", reviewSchema);

module.exports = Review;
