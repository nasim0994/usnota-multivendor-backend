const mongoose = require('mongoose');

const LogoSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  logo: {
    type: String,
    required: true,
  },
}, { timestamps: false });

const Logo = mongoose.model('Logo', LogoSchema);

module.exports = Logo;