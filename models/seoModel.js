const mongoose = require("mongoose");

const seoSchema = new mongoose.Schema(
  {
    keywords: {
      type: Array,
    },
    author: {
      type: String,
    },
    sitemapLink: {
      type: String,
    },
    metaContent: {
      type: String,
    },
    description: {
      type: String,
    },
  },
  { timestamps: false }
);

const SEO = mongoose.model("SEO", seoSchema);

module.exports = SEO;
