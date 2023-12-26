const mongoose = require("mongoose");

const productSchema = {
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  size: {
    type: String,
  },
  color: {
    type: String,
  },
};

const OrderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    shippingInfo: {
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
    totalPrice: {
      type: Number,
      required: true,
    }, 
    products: [productSchema],
    status: {
      type: String,
      enum: ["pending", "shipped", "delivered"],
      default: "pending",
    },
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", OrderSchema);

module.exports = Order;
