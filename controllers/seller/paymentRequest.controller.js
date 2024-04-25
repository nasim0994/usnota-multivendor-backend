const PaymentRequest = require("../../models/seller/paymentrequest.model");
const Seller = require("../../models/seller/seller.model");
const { calculatePagination } = require("../../utils/calculatePagination");
const { pick } = require("../../utils/pick");

exports.createPaymentRequest = async (req, res) => {
  try {
    const data = req?.body;

    const result = await PaymentRequest.create(data);

    const seller = await Seller.findById(data?.sellerId);

    await Seller.findByIdAndUpdate(
      data?.sellerId,
      {
        $set: {
          balance: seller.balance - data.amount,
        },
      },
      { new: true }
    );

    res.status(201).json({
      success: true,
      message: "Payment Request create success",
      data: result,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};

exports.getPaymentRequest = async (req, res) => {
  try {
    const result = await PaymentRequest.find();

    res.status(201).json({
      success: true,
      message: "Payment Request get success",
      data: result,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};

exports.getPaymentRequestBySellerId = async (req, res) => {
  try {
    const paginationOptions = pick(req.query, ["page", "limit"]);
    const { page, limit, skip } = calculatePagination(paginationOptions);
    const { status } = req.query;
    const { id } = req.params;

    let query = {};
    if (status !== "all") query.status = status;
    query.sellerId = id;

    const result = await PaymentRequest.find(query)
      .skip(skip)
      .limit(limit)
      .lean();

    const total = await PaymentRequest.countDocuments({});
    const pages = Math.ceil(parseInt(total) / parseInt(limit));

    res.status(201).json({
      success: true,
      message: "Payment Request get success",
      meta: {
        total,
        pages,
        page,
        limit,
      },
      data: result,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};
