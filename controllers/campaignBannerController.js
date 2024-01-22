const CampaignBanner = require("../models/campaignBannerModel");
const fs = require("fs");

exports.addCampaignBanner = async (req, res) => {
  const data = req.body;
  const image = req?.file?.filename;

  if (!image) {
    return res.status(400).json({
      success: false,
      error: "Image is required",
    });
  }

  try {
    const newData = {
      ...data,
      image,
    };

    const campaignBanner = await CampaignBanner.create(newData);

    res.status(201).json({
      success: true,
      message: "Campaign Banner added successfully",
      data: campaignBanner,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

exports.getCampaignBanners = async (req, res) => {
  try {
    const campaignBanners = await CampaignBanner.find();

    res.status(200).json({
      success: true,
      message: "Campaign Banners fetched successfully",
      data: campaignBanners,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error,
    });
  }
};

exports.getCampaignBannerById = async (req, res) => {
  const { id } = req.params;

  try {
    const campaignBanner = await CampaignBanner.findById(id);

    res.status(200).json({
      success: true,
      message: "Campaign Banner fetched successfully",
      data: campaignBanner,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error,
    });
  }
};

exports.updateCampaignBanner = async (req, res) => {
  const { id } = req.params;
  const data = req.body;
  const image = req?.file?.filename;

  try {
    const campaignBanner = await CampaignBanner.findById(id);

    if (!campaignBanner) {
      return res.status(400).json({
        success: false,
        error: "Campaign Banner not found",
      });
    }

    let newData;
    if (image) {
      fs.unlink(`./uploads/campaignBanner/${campaignBanner?.image}`, (err) => {
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

    await CampaignBanner.findByIdAndUpdate(id, newData, {
      new: true,
    });

    res.status(200).json({
      success: true,
      message: "Campaign Banner updated successfully",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error,
    });
  }
};

exports.deleteCampaignBanner = async (req, res) => {
  const { id } = req.params;

  try {
    const campaignBanner = await CampaignBanner.findById(id);
    if (!campaignBanner) {
      return res.status(400).json({
        success: false,
        error: "Campaign Banner not found",
      });
    }

    await CampaignBanner.findByIdAndDelete(id);

    fs.unlink(`./uploads/campaignBanner/${campaignBanner?.image}`, (err) => {
      if (err) {
        console.log(err);
      }
    });

    res.status(200).json({
      success: true,
      message: "Campaign Banner deleted successfully",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error,
    });
  }
};
