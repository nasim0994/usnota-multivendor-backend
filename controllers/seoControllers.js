const fs = require("fs");
const SEO = require("../models/seoModel");

exports.addSEO = async (req, res) => {
  const data = req?.body;

  try {
    const result = await SEO.create(data);

    res.status(201).json({
      success: true,
      message: "SEO Setting created success",
      data: result,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};

exports.getSEO = async (req, res) => {
  try {
    const result = await SEO.find({});

    if (!result) {
      return res.status(404).json({
        success: false,
        error: "SEO Setting not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "SEO Setting get success",
      data: result,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};

exports.updateSEO = async (req, res) => {
  const id = req?.params?.id;
  const data = req?.body;

  try {
    const isExist = await SEO.findById(id);

    if (!isExist) {
      return res.status(404).json({
        success: false,
        error: "SEO Setting not found",
      });
    }

    const result = await SEO.findByIdAndUpdate(id, data, {
      new: true,
    });

    if (!result) {
      return res.status(404).json({
        success: false,
        error: "SEO Setting not updated",
      });
    }

    res.status(200).json({
      success: true,
      message: "SEO Setting updated success",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};
