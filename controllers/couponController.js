const Coupon = require("../models/couponModel");

exports.addCoupon = async (req, res) => {
  try {
    const data = req.body;
    const result = await Coupon.create(data);
    res.status(200).json({
      success: true,
      message: "Coupon added success",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

exports.getCoupon = async (req, res) => {
  try {
    const coupons = await Coupon.find({});
    res.status(200).json({
      success: true,
      message: "Coupon get success",
      data: coupons,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

exports.deleteCoupon = async (req, res) => {
  try {
    const { id } = req?.params;
    const coupon = await Coupon.findById(id);

    if (!coupon) {
      return res.status(400).json({
        success: false,
        error: "Coupon not found",
      });
    }

    await Coupon.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "Coupon delete success",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

exports.getCouponbyId = async (req, res) => {
  try {
    const { id } = req?.params;
    const coupon = await Coupon.findById(id);

    if (!coupon) {
      return res.status(400).json({
        success: false,
        error: "Coupon not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Coupon edit success",
      data: coupon,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

exports.editCoupon = async (req, res) => {
  try {
    const { id } = req?.params;
    const data = req.body;
    const coupon = await Coupon.findById(id);

    if (!coupon) {
      return res.status(400).json({
        success: false,
        error: "Coupon not found",
      });
    }

    await Coupon.findByIdAndUpdate(id, data, {
      new: true,
    });

    res.status(200).json({
      success: true,
      message: "Coupon edit success",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};
