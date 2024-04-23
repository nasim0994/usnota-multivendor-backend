const mongoose = require("mongoose");

const sellerWhySellHereSchema = new mongoose.Schema(
  {
    title: {
      type: String,
    },
    description: {
      type: String,
    },
    icon: {
      type: String,
    },
    order: {
      type: Number,
    },
  },
  { timestamps: false }
);

const SellerWhySellHere = mongoose.model(
  "SellerWhySellHere",
  sellerWhySellHereSchema
);

module.exports = SellerWhySellHere;
