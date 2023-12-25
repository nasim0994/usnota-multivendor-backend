const Product = require("../models/productModel");
const slugify = require("slugify");
const fs = require("fs");

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

  const date = new Date();
  const formattedDateTime = `${date.getFullYear()}-${
    date.getMonth() + 1
  }-${date.getDate()}-${date.getHours()}-${date.getMinutes()}-${date.getSeconds()}`;
  const slug = slugify(`${title}-${formattedDateTime}`);

  const product = {
    images,
    title,
    slug: slug,
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

exports.getProductBySlug = async (req, res) => {
  try {
    const result = await Product.findOne({ slug: req?.params?.slug });

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

exports.deleteProductById = async (req, res) => {
  try {
    const id = req?.params?.id;

    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    const imagePaths = product.images;
    imagePaths.forEach((imagePath) => {
      const fullPath = `./uploads/${imagePath}`;
      fs.unlink(fullPath, (err) => {
        if (err) {
          console.error(err);
        }
      });
    });

    const result = await Product.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "Product deleted successfully",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};
