const Color = require("../models/colorModel");

exports.addColor = async (req, res) => {
  try {
    const data = req?.body;

    const result = await Color.create(data);

    res.status(200).json({
      success: true,
      message: "Color created successfully",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

exports.deleteColor = async (req, res) => {
  try {
    const { id } = req?.params;

    const result = await Color.deleteOne({ _id: id });

    res.status(200).json({
      success: true,
      message: "Color deleted successfully",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

exports.getColors = async (req, res) => {
  try {
    const colors = await Color.find({});

    res.status(200).json({
      success: true,
      message: "All colors",
      data: colors,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};
