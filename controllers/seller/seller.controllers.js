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
    accessToken = createJsonWebToken({ phone, password }, "6h");

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

exports.updateImage = async (req, res) => {
  try {
    const { id } = req.params;
    const image = req?.file?.filename ? req.file.filename : "";

    const user = await User.findOne({ _id: id });
    const uploadedImage = user?.image;

    if (uploadedImage && uploadedImage !== null) {
      fs.unlink(`./uploads/user/${uploadedImage}`, (err) => {
        if (err) {
          console.log(err);
        }
      });
    }

    await User.findByIdAndUpdate(id, {
      $set: {
        image: image,
      },
    });

    res.status(200).json({
      success: true,
      message: "Image update success",
    });
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

// exports.updateInfo = async (req, res) => {
//   try {
//     const { id } = req.params;
//     await User.findByIdAndUpdate(id, req?.body, { new: true });

//     res.status(200).json({
//       success: true,
//       message: "update success",
//     });
//   } catch (error) {
//     res.status(400).json({
//       success: false,
//       error: error.message,
//     });
//   }
// };
