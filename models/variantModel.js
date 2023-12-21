const mongoose = require('mongoose');

const VariantSchema = new mongoose.Schema({
  size: {
    type: String,
    required: true,
  },
  colorName: {
    type: String,
    required: true,
  },
  colorCode: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
}, { timestamps: false });

const Variant = mongoose.model('Variant', VariantSchema);

module.exports = Variant;