const PaymentRequest = require("../../models/seller/paymentRequestModel");
const Seller = require("../../models/seller/seller.model");
const SellerOrder = require("../../models/seller/sellerOrder.model");
const Order = require("../../models/orderModel");
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
    const result = await PaymentRequest.find().populate(
      "sellerId",
      "shopName balance"
    );

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

exports.transferBalanceByAdmin = async (req, res) => {
  try {
    const { id: sellerId } = req.params;
    const { amount, mainOrderId } = req.body;
    const seller = await Seller.findById(sellerId);

    const commission = process.env.commission;
    const amountWithoutCommission = amount - (amount * commission) / 100;

    await Seller.findByIdAndUpdate(
      sellerId,
      {
        $set: {
          balance: seller?.balance + amountWithoutCommission,
        },
      },
      { new: true }
    );

    await SellerOrder.findOneAndUpdate(
      { sellerId, mainOrderId },
      {
        $set: {
          paid: true,
        },
      },
      { new: true }
    );

    const order = await Order.findById(mainOrderId);
    const selelr = order?.products?.find(
      (seller) => seller?.sellerId == sellerId
    );

    selelr.paid = true;
    await order.save();

    res.status(201).json({
      success: true,
      message: "Balance Tranfer success",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};

exports.acceptRequestByAdmin = async (req, res) => {
  try {
    const { requestId, sellerId } = req.params;
    const { amount } = req.body;

    await PaymentRequest.findByIdAndUpdate(
      requestId,
      {
        $set: {
          status: "success",
        },
      },
      { new: true }
    );

    const seller = await Seller.findById(sellerId);

    await Seller.findByIdAndUpdate(
      sellerId,
      {
        $set: {
          balance: seller?.balance - amount,
        },
      },
      { new: true }
    );

    res.status(201).json({
      success: true,
      message: "Withdrawal Request accept success",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};
