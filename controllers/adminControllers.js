const bcrypt = require("bcrypt");
const fs = require("fs");
const Admin = require("../models/userModel");

exports.updateProfile = async (req, res) => {
  try {
    const data = req?.body;
    const id = req?.params?.id;

    const isExit = await Admin.findById(id);
    if (!isExit)
      return res.status(400).json({
        success: false,
        error: "User Not Found",
      });

    const result = await Admin.findByIdAndUpdate(id, data, {
      new: true,
    });

    res.status(200).json({
      success: true,
      message: "Profile update success",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error?.message,
    });
  }
};

exports.updatePassword = async (req, res) => {
  try {
    const data = req?.body;
    const id = req?.params?.id;

    const isExit = await Admin.findById(id);
    if (!isExit)
      return res.status(400).json({
        success: false,
        error: "Admin Not Found",
      });

    const salt = await bcrypt.genSalt(10);
    const password = await bcrypt.hash(data?.password, salt);

    const result = await Admin.findByIdAndUpdate(
      id,
      { password },
      {
        new: true,
      }
    );

    res.status(200).json({
      success: true,
      message: "Profile update success",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error?.message,
    });
  }
};

exports.addAdmin = async (req, res) => {
  try {
    const data = req?.body;
    const result = await Admin.create(data);

    if (!result) {
      return res.status(404).json({
        success: false,
        error: "Something went wrong",
      });
    }

    res.status(201).json({
      success: true,
      message: "Admin add success",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error?.message,
    });
  }
};

exports.getAllAdmins = async (req, res) => {
  try {
    const admins = await Admin.find({})
      .sort({ createdAt: -1 })
      .where("role")
      .equals(["admin", "superAdmin"]);

    res.status(200).json({
      success: true,
      data: admins,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

exports.getAdminById = async (req, res) => {
  try {
    const { id } = req.params;
    const admin = await Admin.findById(id);

    res.status(200).json({
      success: true,
      data: admin,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

exports.deleteAdmin = async (req, res) => {
  try {
    const { id } = req.params;

    const isExist = await Admin.findById(id);
    if (!isExist) {
      return res.status(404).json({
        success: false,
        error: "Admin not found",
      });
    }

    if (isExist?.image && isExist?.image !== null) {
      fs.unlink(`./uploads/user/${isExist?.image}`, (err) => {
        if (err) {
          console.log(err);
        }
      });
    }

    await Admin.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "Admin delete success",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};
