const fs = require("fs");
const SellerMobileApp = require("../../../models/admin/sellerPage/sellerMobileApp.model");

exports.createSellerMobileApp = async (req, res) => {
  const image = req?.file?.filename;

  try {
    const data = req?.body;

    const sellerMobileApp = {
      ...data,
      image,
    };

    const result = await SellerMobileApp.create(sellerMobileApp);

    res.status(201).json({
      success: true,
      message: "Seller Mobile App add success",
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

exports.getSellerMobileApp = async (req, res) => {
  try {
    const result = await SellerMobileApp.find();

    if (!result) {
      return res.status(404).json({
        success: false,
        error: "Seller MobileApp not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Seller MobileApp get success",
      data: result,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};

exports.updateSellerMobileApp = async (req, res) => {
  const id = req?.params?.id;
  const image = req?.file?.filename;
  const data = req?.body;

  try {
    const isExist = await SellerMobileApp.findById(id);

    if (!isExist) {
      return res.status(404).json({
        success: false,
        error: "Seller MobileApp not found",
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

    const result = await SellerMobileApp.findByIdAndUpdate(id, newData, {
      new: true,
    });

    if (!result) {
      return res.status(404).json({
        success: false,
        error: "Seller MobileApp not updated",
      });
    }

    fs.unlink(`./uploads/sellerBanner/${isExist.image}`, (err) => {
      if (err) {
        console.log(err);
      }
    });

    res.status(200).json({
      success: true,
      message: "Seller MobileApp updated success",
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
