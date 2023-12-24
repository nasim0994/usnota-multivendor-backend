const Product = require("../models/productModel");

exports.addProduct = async (req, res) => {
  const images = req?.files?.map((file) => file.filename);
  const {
    title,
    category,
    brand,
    stock,
    sellPrice,
    purchasePrice,
    description,
    varients,
    colors,
    sizes,
  } = req?.body;

  const product = {
    images,
    title,
    category,
    brand,
    stock,
    sellPrice,
    purchasePrice,
    description,
    varients: JSON.parse(varients),
    colors: JSON.parse(colors),
    sizes: JSON.parse(sizes),
  };

  try {
    const result = await Product.create(product);
    res.status(201).json({
      success: true,
      message: "Product added successfully",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

exports.getAllProducts = async (req, res) => {
  try {
    const result = await Product.find({});

    if (!result) {
      return res.status(404).json({
        success: false,
        message: "No products found",
      });
    }

    res.status(200).json({
      success: true,
      message: "All products",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

exports.getProductById = async (req, res) => {
  try {
    const result = await Product.findById(req?.params?.id);

    if (!result) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Product",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};
