const mongoose = require("mongoose");

const flashDealSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  startDate: {
    type: String,
    required: true,
  },
  endDate: {
    type: String,
    required: true,
  },
  flashProducts: [
    {
      discount: { type: String, required: true },
      discountType: { type: String },
      product: { type: mongoose.Types.ObjectId, ref: "Product" },
    },
  ],
  status: {
    type: Boolean,
    required: true,
    default: false,
  },
});

const FlashDeal = mongoose.model("FlashDeal", flashDealSchema);

module.exports = FlashDeal;
