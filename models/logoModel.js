const mongoose = require("mongoose");

const LogoSchema = new mongoose.Schema(
  {
    logo: {
      type: String,
    },
  },
  { timestamps: false }
);

const Logo = mongoose.model("Logo", LogoSchema);

module.exports = Logo;
