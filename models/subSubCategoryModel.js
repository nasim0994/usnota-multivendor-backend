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
    category: {
      type: mongoose.Types.ObjectId,
      ref: "Categories",
    },
    subCategory: {
      type: mongoose.Types.ObjectId,
      ref: "SubCategory",
    },
  },
  { timestamps: false }
);

const SubSubCategory = mongoose.model("SubSubCategory", SubSubCategorySchema);

module.exports = SubSubCategory;
