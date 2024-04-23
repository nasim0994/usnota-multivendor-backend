const mongoose = require("mongoose");

const sellerFAQSchema = new mongoose.Schema(
  {
    question: {
      type: String,
      required: true,
    },
    ans: {
      type: String,
      required: true,
    },
    order: {
      type: Number,
      required: true,
    },
  },
  { timestamps: false }
);

const SellerFAQ = mongoose.model("SellerFAQ", sellerFAQSchema);

module.exports = SellerFAQ;
