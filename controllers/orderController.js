const Order = require("../models/orderModel");
const Product = require("../models/productModel");
const { calculatePagination } = require("../utils/calculatePagination");
const { pick } = require("../utils/pick");
const axios = require("axios");
const User = require("../models/userModel");
const { v4: uuidv4 } = require("uuid");

exports.addOrder = async (req, res) => {
  const data = req?.body;

  // const invoiceNumber = `INV-${moment().format("YYYYMMDDHHmmss")}-${Math.floor(
  //   Math.random() * 1000
  // )}`;

  let invoiceNumber = "00001";

  try {
    const orders = await Order.find({});

    if (orders?.length > 0) {
      orders?.map((order) => {
        const newNumber = Math.max(parseInt(order?.invoiceNumber)) + 1;

        if (newNumber < 10) {
          invoiceNumber = "0000" + newNumber;
        } else if (newNumber < 100) {
          invoiceNumber = "000" + newNumber;
        } else if (newNumber < 1000) {
          invoiceNumber = "00" + newNumber;
        } else if (newNumber < 10000) {
          invoiceNumber = "0" + newNumber;
        } else {
          invoiceNumber = newNumber;
        }
      });
    }

    const orderData = {
      ...data,
      invoiceNumber,
    };

    const result = await Order.create(orderData);
    // console.log(result);

    result?.products?.forEach(async (product) => {
      const { productId, quantity, color, size } = product;

      const selectedProduct = await Product.findOne({
        _id: productId,
      });
      // console.log(selectedProduct);

      if (color && size) {
        const selectedVariant = selectedProduct?.variants?.find(
          (variant) => variant.color === color && variant.size === size
        );

        // console.log(selectedVariant, "color & size");
        const updatedQuantity = selectedVariant?.quantity - quantity;

        await Product.findByIdAndUpdate(
          productId,
          {
            $set: {
              variants: [
                ...selectedProduct?.variants?.map((variant) => {
                  if (variant.color === color && variant.size === size) {
                    return {
                      ...variant,
                      quantity: updatedQuantity,
                    };
                  }
                  return variant;
                }),
              ],
            },
          },
          { new: true }
        );
      } else if (color) {
        const selectedVariant = selectedProduct?.variants?.find(
          (variant) => variant.color === color
        );

        // console.log(selectedVariant, "color");
        const updatedQuantity = selectedVariant?.quantity - quantity;

        await Product.findByIdAndUpdate(
          productId,
          {
            $set: {
              variants: [
                ...selectedProduct?.variants?.map((variant) => {
                  if (variant.color === color) {
                    return {
                      ...variant,
                      quantity: updatedQuantity,
                    };
                  }
                  return variant;
                }),
              ],
            },
          },
          { new: true }
        );
      } else {
        const updatedQuantity = selectedProduct?.quantity - quantity;
        // console.log(selectedProduct?.quantity, "quantity");

        await Product.findByIdAndUpdate(
          productId,
          {
            $set: {
              quantity: updatedQuantity,
            },
          },
          { new: true }
        );
      }
    });

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

exports.getOrderByTransactionId = async (req, res) => {
  const transactionId = req?.params?.transactionId;

  try {
    const order = await Order.findOne({ transactionId });

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
