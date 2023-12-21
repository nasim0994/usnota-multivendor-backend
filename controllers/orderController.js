const { uuid: uuid4 } = require("uuidv4");
const db = require("../models");

// create main Model
const Order = db.orders;
const Product = db.products;
const User = db.users;
const Variant = db.variants;

exports.addOrder = async (req, res) => {
  try {
    const { userId, products, city, district, street } = req.body;
    const id = uuid4();
    const orderInfo = {
      id,
      userId,
      status: "pending",
    };

    for (const product of products) {
      const { productId, size, color, quantity } = product;
      const variant = await Variant.findOne({
        where: {
          productId,
          size,
          colorName: color,
        },
      });
      if (variant.quantity < quantity) {
        throw new Error(`Not enough stock for productId ${productId}`);
      }
    }

    const order = await Order.create(orderInfo);

    products.map(async (product) => {
      const { productId, size, color, quantity } = product;
      await Variant.decrement(
        { quantity },
        {
          where: {
            productId,
            size,
            colorName: color,
          },
        }
      );

      const existedProduct = await Product.findOne({
        where: { id: productId },
      });

      await order.addProduct(existedProduct, {
        through: {
          quantity,
          size,
          color,
          city,
          district,
          street,
          userId,
        },
      });
    });

    return res.status(200).json({
      status: true,
      data: order,
    });
  } catch (error) {
    res.status(400).json({
      status: false,
      message: error.message,
    });
  }
};

exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.findAll({
      include: [User, Product],
      attributes: { exclude: ["userId"] },
    });
    res.status(200).json({
      status: true,
      data: orders,
    });
  } catch (error) {
    res.status(400).json({
      status: false,
      message: error.message,
    });
  }
};

exports.getOrdersByUserId = async (req, res) => {
  const id = req.params.id;

  const user = await User.findByPk(id, {
    include: {
      model: Order,
      include: Product,
    },
  });

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  res.status(200).json({
    status: true,
    data: user,
  });
};

exports.getSingleOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const order = await Order.findOne({
      include: [User, Product],
      where: { id: id },
    });
    res.status(200).json({
      status: true,
      data: order,
    });
  } catch (error) {
    res.status(400).json({
      status: false,
      message: error.message,
    });
  }
};

exports.updateStatusToPending = async (req, res) => {
  try {
    const { id } = req.params;
    await Order.update(
      { status: "Shipped" },
      {
        where: { id: id },
      }
    );
    res.status(200).json({
      success: true,
      message: "update success",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

exports.updateStatusToShipped = async (req, res) => {
  try {
    const { id } = req.params;
    await Order.update(
      { status: "Delivered" },
      {
        where: { id: id },
      }
    );
    res.status(200).json({
      success: true,
      message: "update success",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
