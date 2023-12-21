const mongoose = require("mongoose");

const OrderItemSchema = new mongoose.Schema(
  {
    quantity: {
      type: Number,
      required: true,
    },
    size: {
      type: String,
      required: true,
    },
    color: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    district: {
      type: String,
      required: true,
    },
    street: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const OrderItem = mongoose.model("OrderItem", OrderItemSchema);

module.exports = OrderItem;