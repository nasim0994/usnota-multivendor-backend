const mongoose = require("mongoose");

const shippingConfigSchema = new mongoose.Schema(
  {
    dhakaCity: {
      time: {
        type: String,
      },
      charge: {
        type: Number,
      },
    },
    dhakaOutCity: {
      time: {
        type: String,
      },
      charge: {
        type: Number,
      },
    },
    outsideDhaka: {
      time: {
        type: String,
      },
      charge: {
        type: Number,
      },
    },
  },
  { timestamps: false }
);

const ShippingConfig = mongoose.model("ShippingConfig", shippingConfigSchema);

module.exports = ShippingConfig;
