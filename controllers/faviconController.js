const fs = require("fs");
const Favicon = require("../models/faviconModel");

exports.addFavicon = async (req, res) => {
  const icon = req?.file?.filename;

  try {
    if (!icon) {
      return res.status(400).json({
        success: false,
        error: "Favicon is requeired",
      });
    }

    const result = await Favicon.create({ icon });

    res.status(200).json({
      success: true,
      message: "Favicon added successfully",
      data: result,
    });
  } catch (error) {
    fs.unlink(`./uploads/favicon/${icon}`, (err) => {
      if (err) {
        console.error(err);
      }
    });

    res.status(400).json({
      success: false,
      error: error?.message,
    });
  }
};

exports.getFavicon = async (req, res) => {
  try {
    const favicon = await Favicon.find({});

    if (!favicon) {
      return res.status(404).json({
        success: false,
        error: "Favicon not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Favicon found successfully",
      data: favicon,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error?.message,
    });
  }
};

exports.updateFavicon = async (req, res) => {
  const icon = req?.file?.filename;
  try {
    if (!icon) {
      return res.status(400).json({
        success: false,
        error: "Favicon is required",
      });
    }

    const id = req?.params?.id;
    const isIcon = await Favicon.findById(id);

    if (isIcon) {
      await Favicon.findByIdAndUpdate(id, { icon }, { new: true });

      fs.unlink(`./uploads/favicon/${isIcon?.icon}`, (err) => {
        if (err) {
          console.error(err);
        }
      });

      res.status(200).json({
        success: true,
        message: "Favicon updated successfully",
      });
    }
  } catch (error) {
    fs.unlink(`./uploads/favicon/${icon}`, (err) => {
      if (err) {
        console.error(err);
      }
    });
    res.status(400).json({
      success: false,
      error: error?.message,
    });
  }
};
