const mongoose = require("mongoose");

const sellerMobileAppSchema = new mongoose.Schema(
  {
    title: {
      type: String,
    },
    mainTitle: {
      type: String,
    },
    description: {
      type: String,
    },
    appLink: {
      type: String,
    },
    image: {
      type: String,
    },
  },
  { timestamps: false }
);

const SellerMobileApp = mongoose.model(
  "SellerMobileApp",
  sellerMobileAppSchema
);

module.exports = SellerMobileApp;
