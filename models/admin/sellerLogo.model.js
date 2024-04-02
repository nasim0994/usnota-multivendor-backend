const mongoose = require("mongoose");

const sellerLogoSchema = new mongoose.Schema(
  {
    logo: {
      type: String,
    },
  },
  { timestamps: false }
);

const SellerLogo = mongoose.model("SellerLogo", sellerLogoSchema);

module.exports = SellerLogo;
