const mongoose = require("mongoose");

const BusinessInfoSchema = new mongoose.Schema(
  {
    companyName: {
      type: String,
      required: true,
    },
    companyStartYear: {
      type: String,
      required: true,
    },
    companyType: {
      type: String,
    },
    bio: {
      type: String,
    },
    tagline: {
      type: String,
    },
    title: {
      type: String,
      required: true,
    },
    metaContent: {
      type: String,
    },
  },
  { timestamps: false }
);

const BusinessInfo = mongoose.model("BusinessInfo", BusinessInfoSchema);

module.exports = BusinessInfo;
