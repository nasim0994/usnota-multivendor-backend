const mongoose = require("mongoose");

const themeSchema = new mongoose.Schema({
  primary: {
    type: String,
    required: true,
  },
  secondary: {
    type: String,
    required: true,
  },
  accent: {
    type: String,
    required: true,
  },
});

const Theme = mongoose.model("Theme", themeSchema);

module.exports = Theme;
