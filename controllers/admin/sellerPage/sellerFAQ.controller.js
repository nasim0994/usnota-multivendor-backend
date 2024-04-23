const SellerFAQ = require("../../../models/admin/sellerpage/sellerFAQ.model");

exports.getSellerFAQ = async (req, res) => {
  try {
    const result = await SellerFAQ.find().sort({ order: 1 });

    if (!result) {
      return res.status(404).json({
        success: false,
        error: "Seller FAQ not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Seller FAQ get success",
      data: result,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};

exports.getSellerFAQById = async (req, res) => {
  try {
    const { id } = req.params;
    const sellerFAQ = await SellerFAQ.findById(id);

    res.status(200).json({
      success: true,
      data: sellerFAQ,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error?.message,
    });
  }
};

exports.addSellerFAQ = async (req, res) => {
  try {
    const data = req?.body;
    const result = await SellerFAQ.create(data);

    if (result?._id) {
      res.status(200).json({
        success: true,
        message: "Seller FAQ add success",
        data: result,
      });
    } else {
      res.status(400).json({
        success: false,
        error: "Something went wrong",
      });
    }
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};

exports.updateSellerFAQ = async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;

    const sellerFAQ = await SellerFAQ.findById(id);

    if (!sellerFAQ) {
      return res.status(400).json({
        success: false,
        error: "Seller FAQ not found",
      });
    }

    const result = await SellerFAQ.findByIdAndUpdate(id, data, {
      new: true,
    });

    res.status(200).json({
      success: true,
      message: "Seller FAQ update success",
      data: result,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};

exports.deleteSellerFAQ = async (req, res) => {
  try {
    const { id } = req.params;

    const isExist = await SellerFAQ.findById(id);
    if (!isExist) {
      return res.status(404).json({
        success: false,
        error: "Seller FAQ not found",
      });
    }

    await SellerFAQ.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "Seller FAQ delete success",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};
