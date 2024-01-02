const mongoose = require("mongoose");

const SubSubCategorySchema = new mongoose.Schema(
  {
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

const SubSubCategory = mongoose.model("SubSubCategory", SubSubCategorySchema);

module.exports = SubSubCategory;
