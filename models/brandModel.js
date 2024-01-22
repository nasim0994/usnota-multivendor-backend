const mongoose = require("mongoose");

const BrandSchema = new mongoose.Schema(
  {
    icon: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
  },
  { timestamps: false }
);

const Brand = mongoose.model("Brand", BrandSchema);

module.exports = Brand;
