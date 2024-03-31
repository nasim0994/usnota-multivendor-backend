const fs = require("fs");
const ShippingConfig = require("../models/shippingConfigModel");

exports.addShippingConfig = async (req, res) => {
  const data = req?.body;
  console.log(data);

  try {
    const result = await ShippingConfig.create(data);

    res.status(201).json({
      success: true,
      message: "ShippingConfig Setting add success",
      data: result,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};

exports.getShippingConfig = async (req, res) => {
  try {
    const result = await ShippingConfig.find();

    if (!result) {
      return res.status(404).json({
        success: false,
        error: "ShippingConfig Setting not found",
        data: result,
      });
    }

    res.status(200).json({
      success: true,
      message: "ShippingConfig Setting get success",
      data: result,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};

exports.updateShippingConfig = async (req, res) => {
  const id = req?.params?.id;
  const data = req?.body;

  try {
    const isExist = await ShippingConfig.findById(id);

    if (!isExist) {
      return res.status(404).json({
        success: false,
        error: "ShippingConfig Setting not found",
      });
    }

    const result = await ShippingConfig.findByIdAndUpdate(id, data, {
      new: true,
    });

    if (!result) {
      return res.status(404).json({
        success: false,
        error: "ShippingConfig Setting not updated",
      });
    }

    res.status(200).json({
      success: true,
      message: "ShippingConfig Setting updated success",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};
