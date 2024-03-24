const FlashDeal = require("../models/flashDealModel");

exports.addFlashDeal = async (req, res) => {
  try {
    const flashDealInfo = req?.body;

    const result = await FlashDeal.create(flashDealInfo);
    res.status(200).json({
      success: true,
      message: "flash Deal add success",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

exports.getAllFlashDeal = async (req, res) => {
  try {
    const flashDeal = await FlashDeal.find({}).populate(
      "flashProducts.product"
    );

    res.status(200).json({
      success: true,
      message: "flash Deal get success",
      data: flashDeal,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};
