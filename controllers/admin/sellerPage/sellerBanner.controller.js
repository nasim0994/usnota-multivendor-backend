const fs = require("fs");
const SellerBanner = require("../../../models/admin/sellerPage/sellerBanner.model");

exports.createSellerBanner = async (req, res) => {
  const image = req?.file?.filename;

  try {
    const data = req?.body;

    const sellerBanner = {
      ...data,
      image,
    };

    const result = await SellerBanner.create(sellerBanner);

    res.status(201).json({
      success: true,
      message: "Seller Banner add success",
      data: result,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message,
    });

    if (image) {
      fs.unlink(`./uploads/sellerBanner/${image}`, (err) => {
        if (err) {
          console.log(err);
        }
      });
    }
  }
};

exports.getSellerBanner = async (req, res) => {
  try {
    const result = await SellerBanner.find();

    if (!result) {
      return res.status(404).json({
        success: false,
        error: "Seller Banner not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Seller Banner get success",
      data: result,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};

exports.updateSellerBanner = async (req, res) => {
  const id = req?.params?.id;
  const image = req?.file?.filename;
  const data = req?.body;

  try {
    const isExist = await SellerBanner.findById(id);

    if (!isExist) {
      return res.status(404).json({
        success: false,
        error: "Seller Banner not found",
      });
    }

    let newData;

    if (image) {
      newData = {
        ...data,
        image,
      };
    } else {
      newData = { ...data };
    }

    const result = await SellerBanner.findByIdAndUpdate(id, newData, {
      new: true,
    });

    if (!result) {
      return res.status(404).json({
        success: false,
        error: "Seller Banner not updated",
      });
    }

    fs.unlink(`./uploads/sellerBanner/${isExist.image}`, (err) => {
      if (err) {
        console.log(err);
      }
    });

    res.status(200).json({
      success: true,
      message: "Seller Banner updated success",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });

    if (image) {
      fs.unlink(`./uploads/sellerBanner/${image}`, (err) => {
        if (err) {
          console.log(err);
        }
      });
    }
  }
};
