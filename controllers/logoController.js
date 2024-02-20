const fs = require("fs");
const Logo = require("../models/logoModel");

exports.addLogo = async (req, res) => {
  try {
    const logo = req?.file?.filename;
    if (!logo) {
      return res.status(404).json({
        success: false,
        error: "Logo is requred",
      });
    }

    const result = await Logo.create({ logo: logo });

    if (!result) {
      return res.status(404).json({
        success: false,
        error: "Logo not added",
      });
    }

    res.status(200).json({
      success: true,
      message: "Logo added successfully",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

exports.getLogos = async (req, res) => {
  try {
    const logo = await Logo.find({});

    if (!logo) {
      return res.status(404).json({
        success: false,
        error: "Logo not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Logo found successfully",
      data: logo,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

exports.updateLogo = async (req, res) => {
  try {
    const logo = req?.file?.filename;
    if (!logo) {
      return res.status(400).json({
        success: false,
        error: "Logo is required",
      });
    }

    const id = req?.params?.id;
    const isLogo = await Logo.findOne({ _id: id });

    if (isLogo) {
      await Logo.findByIdAndUpdate(id, { logo: logo }, { new: true });

      fs.unlink(`./uploads/logo/${isLogo?.logo}`, (err) => {
        if (err) {
          console.error(err);
          return;
        }
      });

      res.status(200).json({
        success: true,
        message: "Logo updated successfully",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};
