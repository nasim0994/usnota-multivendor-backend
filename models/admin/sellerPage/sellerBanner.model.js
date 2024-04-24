const mongoose = require("mongoose");

const sellerBannerSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
  },
  { timestamps: false }
);

const SellerBanner = mongoose.model("SellerBanner", sellerBannerSchema);

module.exports = SellerBanner;
