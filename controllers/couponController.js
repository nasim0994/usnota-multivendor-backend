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

exports.applyCoupon = async (req, res) => {
  try {
    const { coupon, totalShopping } = req.body;
    const result = await Coupon.findOne({ code: coupon });
    if (!result) {
      return res.status(500).json({
        success: false,
        error: "Coupon not available",
      });
    }

    if (!result.status) {
      return res.status(500).json({
        success: false,
        error: "Coupon not active",
      });
    }

    if (Number(totalShopping) < Number(result.minimumShopping)) {
      return res.status(500).json({
        success: false,
        error: `Minimum Shopping ${result.minimumShopping} tk, add more itmes.`,
      });
    }

    const couponStartDate = new Date(`${result.startDate}T${result.startTime}`);
    const couponEndDate = new Date(`${result.endDate}T${result.endTime}`);
    const currentDate = new Date();

    if (currentDate < couponStartDate) {
      return res.status(500).json({
        success: false,
        error: `Coupon not started`,
      });
    }

    if (currentDate > couponEndDate) {
      return res.status(500).json({
        success: false,
        error: `Coupon expired!`,
      });
    }

    res.status(200).json({
      success: true,
      message: "Coupon get success",
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

exports.updateStatus = async (req, res) => {
  try {
    const { id } = req?.params;
    const { status } = req.body;
    const coupon = await Coupon.findById(id);

    if (!coupon) {
      return res.status(400).json({
        success: false,
        error: "Coupon not found",
      });
    }

    coupon.status = status;
    await coupon.save();

    res.status(200).json({
      success: true,
      message: "Coupon status update success",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};
