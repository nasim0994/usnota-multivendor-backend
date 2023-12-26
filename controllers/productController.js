const Product = require("../models/productModel");
const slugify = require("slugify");
const fs = require("fs");
const { calculatePagination } = require("../utils/calculatePagination");
const { pick } = require("../utils/pick");

exports.addProduct = async (req, res) => {
  const images = req?.files?.map((file) => file.filename);

  if (images.length < 1) {
    return res.status(400).json({
      success: false,
      error: "Please upload at least one image",
    });
  }

  const { title, varients, colors, sizes } = req?.body;

  const slug = slugify(`${title}-${Date.now()}`);

  const product = {
    ...req?.body,
    images,
    slug: slug,
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
    if (images.length > 0) {
      images.forEach((imagePath) => {
        const fullPath = `./uploads/products/${imagePath}`;
        fs.unlink(fullPath, (err) => {
          if (err) {
            console.error(err);
          }
        });
      });
    }

    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

exports.getAllProducts = async (req, res) => {
  const paginationOptions = pick(req.query, ["page", "limit"]);
  const filters = pick(req.query, ["category"]);

  const { page, limit, skip } = calculatePagination(paginationOptions);
  const { category } = filters;

  try {
    const andCondition = [];

    if (category && category !== undefined) {
      andCondition.push({ category: category });
    }

    const whereCondition =
      andCondition.length > 0 ? { $and: andCondition } : {};

    const result = await Product.find(whereCondition)
      .skip(skip)
      .limit(limit)
      .lean();

    const total = await Product.countDocuments(whereCondition);

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
      meta: {
        total,
        page,
        limit,
      },
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

    const imagePaths = product?.images;
    imagePaths.forEach((imagePath) => {
      const fullPath = `./uploads/products/${imagePath}`;
      fs.unlink(fullPath, (err) => {
        if (err) {
          console.error(err);
        }
      });
    });

    await Product.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};
