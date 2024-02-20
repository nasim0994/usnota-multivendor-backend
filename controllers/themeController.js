const Theme = require("../models/themeModel");

exports.addTheme = async (req, res) => {
  try {
    const data = req?.body;

    const theme = await Theme.create(data);

    res.status(201).json({
      success: true,
      message: "Theme created successfully",
      data: theme,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

exports.getThemes = async (req, res) => {
  try {
    const theme = await Theme.find({});

    res.status(200).json({
      success: true,
      message: "Themes found successfully",
      data: theme,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

exports.updateTheme = async (req, res) => {
  const data = req?.body;
  const id = req?.params?.id;

  try {
    const updatedTheme = await Theme.findByIdAndUpdate(id, data, { new: true });

    res.status(200).json({
      success: true,
      message: "Theme updated successfully",
      data: updatedTheme,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};
