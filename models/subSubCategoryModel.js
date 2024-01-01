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
    order: {
      type: Number,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
  },
  { timestamps: false }
);

const SubSubCategory = mongoose.model("SubSubCategory", SubSubCategorySchema);

module.exports = SubSubCategory;