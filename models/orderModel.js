const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema(
  {
    orderItemId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "OrderItem",
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    status: {
      type: String,
      default: "pending",
    },
  },
  { timestamps: true }
);

const Order = mongoose.model('Order', OrderSchema);

module.exports = Order;