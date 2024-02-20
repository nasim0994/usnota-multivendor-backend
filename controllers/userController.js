const fs = require("fs");
const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const { createJsonWebToken } = require("../utils/jsonWebToken");

exports.registerUser = async (req, res) => {
  try {
    const userInfo = req.body;
    const result = await User.create(userInfo);

    res.status(200).json({
      success: true,
      message: "Register Success",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { phone, password } = req.body;
    // console.log(phone, password);

    // 2. Load User
    const user = await User.findOne({ phone: phone });

    if (!user) {
      return res.status(401).json({
        success: false,
        error: "User not found",
      });
    }

    // 3. Match Password
    const isMatch = await bcrypt.compare(password, user?.password);

    if (!isMatch) {
      return res.status(404).json({
        success: false,
        error: "Email or password is incorrect",
      });
    }

    // 5. generate token
    let accessToken = "";
    if (user?.role === "admin") {
      accessToken = createJsonWebToken({ phone, password }, "2h");
    } else {
      accessToken = createJsonWebToken({ phone, password }, "2d");
    }

    res.status(200).json({
      success: true,
      message: "Login Success",
      token: accessToken,
      data: user,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

exports.getMe = async (req, res) => {
  try {
    const user = await User.findOne({ phone: req.user.phone });
    if (user) {
      res.status(200).json({
        success: true,
        data: user,
      });
    } else {
      res.status(404).json({
        success: false,
        error: "user not found",
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

exports.updateInfo = async (req, res) => {
  try {
    const { id } = req.params;
    await User.findByIdAndUpdate(id, req?.body, { new: true });

    res.status(200).json({
      success: true,
      message: "update success",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const result = await User.find({});

    res.status(200).json({
      success: true,
      message: "get all users success",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

exports.getAllCustomers = async (req, res) => {
  try {
    const customer = await User.find({}).where("role").equals("user");

    res.status(200).json({
      success: true,
      data: customer,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

exports.deleteAnUser = async (req, res) => {
  try {
    const { id } = req.params;

    const isExist = await User.findById(id);
    if (!isExist) {
      return res.status(404).json({
        success: false,
        error: "User not found",
      });
    }

    if (isExist?.image && isExist?.image !== null) {
      fs.unlink(`./uploads/user/${isExist?.image}`, (err) => {
        if (err) {
          console.log(err);
        }
      });
    }

    await User.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "user delete success",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};
