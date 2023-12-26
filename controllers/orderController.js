const Order = require("../models/orderModel");
const Product = require("../models/productModel");
const { calculatePagination } = require("../utils/calculatePagination");
const { pick } = require("../utils/pick");

exports.addOrder = async (req, res) => {
  const data = req?.body;

  try {
    const result = await Order.create(data);

    // data?.products?.forEach(async (product) => {
    //   const { productId, quantity, size, color } = product;

    //   const selectedProduct = await Product.findOne({
    //     _id: productId,
    //   });

    //   const selectedColorVarient = selectedProduct?.varients?.find(
    //     (varient) => varient.color === color
    //   );

    //   const selectedSizeVarient = selectedColorVarient?.info?.find(
    //     (varient) => varient.size === size
    //   );

    //   // Calculate the updated quantity
    //   const updatedQuantity = selectedSizeVarient.quantity - parseInt(quantity);

    //   // Update the quantity in the database
    //   await Product.findOneAndUpdate(
    //     {
    //       _id: productId,
    //       "varients.color": color,
    //       "varients.info.size": size,
    //     },
    //     { $set: { "varients.$.info.$[elem].quantity": updatedQuantity } },
    //     {
    //       new: true,
    //     }
    //   );
    // });

    res.status(201).json({
      success: true,
      message: "Order added successfully",
      //   data: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

exports.getOrdersByUserId = async (req, res) => {
  const id = req?.params?.id;

  try {
    const orders = await Order.find({ userId: id });

    res.status(200).json({
      success: true,
      message: "Orders fetched successfully",
      data: orders,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

exports.getOrderById = async (req, res) => {
  const id = req?.params?.id;

  try {
    const order = await Order.findById(id)
      .populate("userId")
      .populate("products.productId");

    res.status(200).json({
      success: true,
      message: "Order fetched successfully",
      data: order,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

exports.getAllOrders = async (req, res) => {
  const paginationOptions = pick(req.query, ["page", "limit"]);

  const { page, limit, skip } = calculatePagination(paginationOptions);

  try {
    const orders = await Order.find({})
      .populate("userId")
      .populate("products.productId")
      .skip(skip)
      .limit(limit)
      .lean();

    const total = await Order.countDocuments({});

    res.status(200).json({
      success: true,
      message: "Orders fetched successfully",
      data: orders,
      meta: {
        total,
        page,
        limit,
      },
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

exports.deleteOrderById = async (req, res) => {
  const id = req?.params?.id;

  try {
    const result = await Order.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "Order deleted successfully",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

exports.updateStatus = async (req, res) => {
  const id = req?.params?.id;
  const status = req?.body?.status;

  try {
    const result = await Order.findByIdAndUpdate(
      id,
      { $set: { status } },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "Order status updated successfully",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};
