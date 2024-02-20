const BusinessInfo = require("../models/businessInfoModel");

exports.addBusinessInfo = async (req, res) => {
  try {
    const result = await BusinessInfo.create(req.body);

    res.status(200).json({
      success: true,
      message: "Business Info created success",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error?.message,
    });
  }
};

exports.getBusinessInfo = async (req, res) => {
  try {
    const result = await BusinessInfo.find({});

    res.status(200).json({
      success: true,
      message: "get Business Info success",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error?.message,
    });
  }
};

exports.updateBusinessInfo = async (req, res) => {
  try {
    const data = req?.body;
    const id = req?.params?.id;

    const result = await BusinessInfo.findByIdAndUpdate(id, data, {
      new: true,
    });

    res.status(200).json({
      success: true,
      message: "Business Info update success",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error?.message,
    });
  }
};
