const mongoose = require("mongoose");

const topCampaignBannerSchema = new mongoose.Schema(
  {
    image: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const TopCampaignBanner = mongoose.model(
  "TopCampaignBanner",
  topCampaignBannerSchema
);

module.exports = TopCampaignBanner;
