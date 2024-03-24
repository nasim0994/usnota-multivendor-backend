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
      ...req.body,
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
    const banners = await Banner.find({}).sort({ order: 1 });

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
      fs.unlink(`./uploads/banner/${banner?.image}`, (err) => {
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

exports.getBannerById = async (req, res) => {
  const { id } = req.params;

  try {
    const banner = await Banner.findById(id);

    res.status(200).json({
      success: true,
      message: " Banner fetched successfully",
      data: banner,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error,
    });
  }
};

exports.updateBanner = async (req, res) => {
  const { id } = req.params;
  const data = req.body;
  const image = req?.file?.filename;

  try {
    const banner = await Banner.findById(id);

    if (!banner) {
      return res.status(400).json({
        success: false,
        error: "Banner not found",
      });
    }

    let newData;
    if (image) {
      fs.unlink(`./uploads/banner/${banner?.image}`, (err) => {
        if (err) {
          console.log(err);
        }
      });

      newData = {
        ...data,
        image,
      };
    } else {
      newData = { ...data };
    }

    await Banner.findByIdAndUpdate(id, newData, {
      new: true,
    });

    res.status(200).json({
      success: true,
      message: "Banner updated successfully",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error,
    });
  }
};
