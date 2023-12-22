const fs = require("fs");
const Banner = require("../models/bannerModel");

exports.addBanner = async (req, res) => {
  try {
    const image = req?.file?.filename;

    if (!image) {
      return res.status(400).json({
        success: false,
        error: "banner image is required",
      });
    }

    const banner = {
      image: image,
    };

    const result = await Banner.create(banner);

    res.status(200).json({
      success: true,
      message: "Banner created successfully",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

exports.allBanners = async (req, res) => {
  try {
    const banners = await Banner.find({});

    res.status(200).json({
      success: true,
      message: "All banners",
      data: banners,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

exports.deleteBanner = async (req, res) => {
  try {
    const { id } = req?.params;
    const banner = await Banner.findOne({ _id: id });

    if (banner) {
      fs.unlink(`./uploads/banner/${banner.image}`, (err) => {
        if (err) {
          console.log(err);
        }
      });

      await Banner.findByIdAndDelete(id);

      res.status(200).json({
        success: true,
        message: "Delete success",
      });
    } else {
      res.status(400).json({
        success: false,
        error: "Banner not found",
      });
    }
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};
