const mongoose = require("mongoose");

const sellerBannerSchema = new mongoose.Schema(
  {
    title: {
      type: String,
    },
    description: {
      type: String,
    },
    image: {
      type: String,
    },
  },
  { timestamps: false }
);

const SellerBanner = mongoose.model("SellerBanner", sellerBannerSchema);

module.exports = SellerBanner;
