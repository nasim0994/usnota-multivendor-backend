const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const sellerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    shopName: {
      type: String,
      required: true,
    },
    logo: {
      type: String,
    },
    banner: {
      type: String,
    },
    role: {
      type: String,
      default: "seller",
    },
    email: {
      type: String,
      unique: true,
    },
    phone: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    verify: {
      type: Boolean,
      required: true,
      default: false,
      enum: [true, false],
    },
    status: {
      type: Boolean,
      required: true,
      default: true,
      enum: [true, false],
    },
    follow: {
      type: Number,
      default: 0,
    },
    // Payment
    balance: {
      type: Number,
      default: 0,
    },
    paymentOption: {
      type: Object,
    },

    // More
    country: {
      type: String,
      default: "Bangladesh",
    },
    city: {
      type: String,
    },
    area: {
      type: String,
    },
    state: {
      type: String,
    },
    fullAddress: {
      type: String,
    },
    storeLink: {
      type: String,
    },
    idCard: {
      type: String,
    },
    idName: {
      type: String,
    },
    idNumber: {
      type: String,
    },
  },
  { timestamps: true }
);

sellerSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

const Seller = mongoose.model("Seller", sellerSchema);

module.exports = Seller;
