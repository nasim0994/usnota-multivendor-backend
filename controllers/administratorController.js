const bcrypt = require("bcrypt");
const Administrator = require("../models/userModel");
const { createJsonWebToken } = require("../utils/jsonWebToken");

exports.addAdministrator = async (req, res) => {
  const data = req?.body;

  try {
    const result = await Administrator.create(data);

    if (!result) {
      return res.status(404).json({
        success: false,
        error: "Administrator not added",
      });
    }

    res.status(201).json({
      success: true,
      message: "Administrator added successfully",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

exports.adminLogin = async (req, res) => {
  const data = req?.body;
  try {
    const { email, password } = data;

    if (!email || !password) {
      return res.status(404).json({
        success: false,
        error: "You are not authorized! Please provide email and password",
      });
    }

    const admin = await Administrator.findOne({ email: email });

    if (!admin) {
      return res.status(404).json({
        success: false,
        error: "You are not authorized!",
      });
    }

    const isMatch = await bcrypt.compare(password, admin?.password);

    if (!isMatch) {
      return res.status(404).json({
        success: false,
        error: "Email or password is incorrect",
      });
    }

    let accessToken = createJsonWebToken({ email, password }, "5h");

    res.status(200).json({
      success: true,
      message: "You are logged in successfully",
      token: accessToken,
      data: admin,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

exports.deleteAdmin = async (req, res) => {
  try {
    const result = await Administrator.findByIdAndDelete(req?.params?.id);

    if (!result) {
      return res.status(404).json({
        success: false,
        error: "Administrator not deleted",
      });
    }

    res.status(200).json({
      success: true,
      message: "Administrator deleted successfully",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

exports.getAdmins = async (req, res) => {
  try {
    const result = await Administrator.find({});

    if (!result) {
      return res.status(404).json({
        success: false,
        error: "Administrators not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "All administrators",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

exports.getLoggedAdmin = async (req, res) => {
  try {
    const user = await Administrator.findOne({
      email: req.user.email,
    });

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
