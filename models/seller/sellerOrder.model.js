const mongoose = require("mongoose");

const sellerOrderSchema = new mongoose.Schema(
  {
    mainOrderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
      required: true,
    },
    sellerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Seller",
      required: true,
    },
    totalSellerPrice: {
      type: Number,
    },
    products: [
      {
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
      },
    ],
    status: {
      type: String,
      required: true,
      default: "pending",
      enum: ["pending", "processing", "warehouse"],
    },
    paid: {
      type: Boolean,
      default: false,
      enum: [false, true],
    },
  },
  { timestamps: true }
);

const SellerOrder = mongoose.model("SellerOrder", sellerOrderSchema);

module.exports = SellerOrder;
