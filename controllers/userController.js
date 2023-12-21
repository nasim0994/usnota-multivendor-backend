const db = require("../models");
const User = db.users;
const { createJsonWebToken } = require("../utils/jsonwebtoken");
const { uuid: uuid4 } = require("uuidv4");
const fs = require("fs");

exports.registerUser = async (req, res) => {
  try {
    const userInfo = req.body;
    const isExisted = await User.findOne({
      where: {
        phone: userInfo?.phone,
      },
    });

    if (isExisted) {
      return res.status(400).json({
        success: false,
        message: "User already exist. please login",
      });
    }

    const id = Date.now() + "-" + uuid4();
    const result = await User.create({ id, ...userInfo });

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

    // 2. Load User
    const user = await User.findOne({ where: { phone: phone } });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User not found",
      });
    }

    // 3. Match Password
    if (password !== user.password) {
      return res.status(401).json({
        success: false,
        message: "Email or Password not match",
      });
    }

    // 5. generate token
    let accessToken = "";
    if (user?.role === "admin") {
      accessToken = createJsonWebToken({ phone, password }, "6h");
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
    const user = await User.findOne({ where: { phone: req.user.phone } });
    if (user) {
      res.status(200).json({
        success: true,
        data: user,
      });
    } else {
      res.status(404).json({
        success: false,
        message: "user not found",
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
    const user = await User.findOne({ where: { id: id } });
    const uploadedImage = user?.image;

    if (uploadedImage && uploadedImage !== null) {
      fs.unlinkSync("upload/images/users/" + uploadedImage);
    }

    await User.update({ image: image }, { where: { id: id } });

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
    await User.update(req.body, { where: { id: id } });

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
    const result = await User.findAll({
      attributes: { exclude: ["password"] },
    });

    res.status(200).json({
      success: true,
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
    const customer = await User.findAll({ where: { role: "user" } });

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

exports.getAllAdmins = async (req, res) => {
  try {
    const customer = await User.findAll({ where: { role: "admin" } });

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
    const user = await User.findOne({ where: { id: id } });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "user not found",
      });
    }

    await User.destroy({ where: { id: id } });

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

exports.addAdmin = async (req, res) => {
  try {
    const adminInfo = req.body;
    const isExisted = await User.findOne({ where: { phone: adminInfo.phone } });
    if (isExisted) {
      return res.status(400).json({
        success: false,
        message: "User already exist.",
      });
    }

    const id = uuid4();
    const result = await User.create({ id, ...adminInfo });

    res.status(200).json({
      success: true,
      message: "user create success",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};
