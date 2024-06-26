const fs = require("fs");
const bcrypt = require("bcrypt");
const Seller = require("../../models/seller/seller.model");
const { createJsonWebToken } = require("../../utils/jsonWebToken");

exports.registerSeller = async (req, res) => {
  try {
    const sellerInfo = req.body;
    const result = await Seller.create(sellerInfo);

    res.status(200).json({
      success: true,
      message: "Seller Register Success",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

exports.loginSeller = async (req, res) => {
  try {
    const { phone, password } = req.body;

    // 2. Load User
    const seller = await Seller.findOne({ phone: phone });

    if (!seller) {
      return res.status(401).json({
        success: false,
        error: "Seller not found",
      });
    }

    // 3. Match Password
    const isMatch = await bcrypt.compare(password, seller?.password);

    if (!isMatch) {
      return res.status(404).json({
        success: false,
        error: "Email or password is incorrect",
      });
    }

    // 5. generate token
    let accessToken = "";
    accessToken = createJsonWebToken({ phone, password }, "12h");

    res.status(200).json({
      success: true,
      message: "Seller Login Success",
      token: accessToken,
      data: seller,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

exports.getAllSellers = async (req, res) => {
  try {
    const sellers = await Seller.find({});
    if (sellers) {
      res.status(200).json({
        success: true,
        data: sellers,
      });
    } else {
      res.status(404).json({
        success: false,
        error: "Sellers not found",
      });
    }
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

exports.getsellerByToken = async (req, res) => {
  try {
    const seller = await Seller.findOne({ phone: req.user.phone });
    if (seller) {
      res.status(200).json({
        success: true,
        data: seller,
      });
    } else {
      res.status(404).json({
        success: false,
        error: "Seller not found",
      });
    }
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

exports.getsellerById = async (req, res) => {
  try {
    const { id } = req.params;
    const seller = await Seller.findById(id);
    if (seller) {
      res.status(200).json({
        success: true,
        data: seller,
      });
    } else {
      res.status(404).json({
        success: false,
        error: "Seller not found",
      });
    }
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

exports.toggleSellerVerify = async (req, res) => {
  try {
    const { id } = req.params;
    const seller = await Seller.findById(id);
    if (!seller) {
      return res.status(404).json({
        success: false,
        error: "Seller not found",
      });
    }

    const filter = { _id: id };
    const update = { verify: !seller.verify };
    await Seller.findOneAndUpdate(filter, update);

    res.status(200).json({
      success: true,
      message: "Seller verify success",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

exports.updateInfoForVerify = async (req, res) => {
  const idCard = req?.file?.filename;

  try {
    const { id } = req.params;
    const seller = await Seller.findById(id);
    if (!seller) {
      return res.status(404).json({
        success: false,
        error: "Seller not found",
      });
    }

    if (seller?.idCard) {
      fs.unlink(`./uploads/seller/profile/${seller?.idCard}`, (err) => {
        if (err) {
          console.error(err);
        }
      });
    }

    const data = req.body;

    const filter = { _id: id };
    const update = { ...data, idCard };
    const result = await Seller.findOneAndUpdate(filter, update, { new: true });

    res.status(200).json({
      success: true,
      message: "Seller verification info update success",
      data: result,
    });
  } catch (error) {
    fs.unlink(`./uploads/seller/profile/${idCard}`, (err) => {
      if (err) {
        console.error(err);
      }
    });
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

exports.updateLogo = async (req, res) => {
  try {
    const { id } = req.params;
    const logo = req?.file?.filename;

    if (!logo) {
      return res.status(404).json({
        success: false,
        error: "Logo is requred",
      });
    }

    const seller = await Seller.findById(id);
    const oldLogo = seller?.logo;

    await Seller.findByIdAndUpdate(
      id,
      {
        $set: {
          logo: logo,
        },
      },
      { new: true }
    );

    if (oldLogo && oldLogo !== null) {
      fs.unlink(`./uploads/seller/profile/${oldLogo}`, (err) => {
        if (err) {
          console.log(err);
        }
      });
    }

    res.status(200).json({
      success: true,
      message: "Logo update success",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

exports.updateBanner = async (req, res) => {
  try {
    const { id } = req.params;
    const banner = req?.file?.filename;

    if (!banner) {
      return res.status(404).json({
        success: false,
        error: "Banner is requred",
      });
    }

    const seller = await Seller.findById(id);
    const oldBanner = seller?.banner;

    await Seller.findByIdAndUpdate(
      id,
      {
        $set: {
          banner: banner,
        },
      },
      { new: true }
    );

    if (oldBanner && oldBanner !== null) {
      fs.unlink(`./uploads/seller/profile/${oldBanner}`, (err) => {
        if (err) {
          console.log(err);
        }
      });
    }

    res.status(200).json({
      success: true,
      message: "Banner update success",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

exports.updateInfo = async (req, res) => {
  try {
    const { id } = req.params;
    await Seller.findByIdAndUpdate(id, req?.body, { new: true });

    res.status(200).json({
      success: true,
      message: "Update info success",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};
