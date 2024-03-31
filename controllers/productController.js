const Product = require("../models/productModel");
const Categories = require("../models/categoriesModel");
const SubCategory = require("../models/subCategoryModel");
const SubSubCategory = require("../models/subSubCategoryModel");
const Brand = require("../models/brandModel");
const slugify = require("slugify");
const fs = require("fs");
const { calculatePagination } = require("../utils/calculatePagination");
const { pick } = require("../utils/pick");

exports.addProduct = async (req, res) => {
  const images = req?.files?.map((file) => file.filename);

  if (images?.length < 1) {
    return res.status(400).json({
      success: false,
      error: "Please upload at least one image",
    });
  }

  const { title, variants } = req?.body;

  const product = {
    ...req?.body,
    slug: slugify(`${title}-${Date.now()}`),
    images,
    variants: variants && JSON.parse(variants),
  };

  try {
    const result = await Product.create(product);
    res.status(200).json({
      success: true,
      message: "Product added successfully",
      data: result,
    });
  } catch (error) {
    if (images?.length > 0) {
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
  const { category, subCategory, subSubCategory, brand } = req.query;
  const { page, limit, skip } = calculatePagination(paginationOptions);

  try {
    const targetedCategory = await Categories.findOne({
      slug: category && category,
    });
    const targetedSubCategory = await SubCategory.findOne({
      slug: subCategory && subCategory,
    });
    const targetedSubSubCategory = await SubSubCategory.findOne({
      slug: subSubCategory && subSubCategory,
    });
    const targetedBrand = await Brand.findOne({
      slug: brand && brand,
    });

    const categoryId = targetedCategory?._id;
    const subCategoryId = targetedSubCategory?._id;
    const subSubategoryId = targetedSubSubCategory?._id;
    const brandName = targetedBrand?.name;

    let query = {};
    if (category) query.category = categoryId;
    if (subCategory) query.subCategory = subCategoryId;
    if (subSubCategory) query.subSubCategory = subSubategoryId;
    if (brand) query.brand = brandName;

    const products = await Product.find(query)
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 })
      .populate("category subCategory subSubCategory", "name slug icon");

    const total = await Product.countDocuments(query);
    const pages = Math.ceil(parseInt(total) / parseInt(limit));

    res.status(200).json({
      success: true,
      message: "Products fetched successfully",
      meta: {
        total,
        pages,
        page,
        limit,
      },
      data: products,
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
    const result = await Product.findById(req?.params?.id).populate(
      "category subCategory subSubCategory"
    );

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
    const result = await Product.findOne({ slug: req?.params?.slug }).populate(
      "category subCategory subSubCategory",
      "name slug icon"
    );

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

exports.updateProduct = async (req, res) => {
  const id = req?.params?.id;
  const images = req?.files?.map((file) => file.filename);

  const { title, variants } = req?.body;

  try {
    const isProduct = await Product.findById(id);
    // console.log(isProduct);
    if (!isProduct) {
      images?.forEach((imagePath) => {
        const fullPath = `./uploads/products/${imagePath}`;
        fs.unlink(fullPath, (err) => {
          if (err) {
            console.error(err);
          }
        });
      });

      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    if (images && images.length > 0) {
      const product = {
        ...req?.body,
        slug: slugify(`${title}-${Date.now()}`),
        images,
        variants: JSON.parse(variants),
      };

      const imagePaths = isProduct?.images;
      imagePaths.forEach((imagePath) => {
        const fullPath = `./uploads/products/${imagePath}`;
        fs.unlink(fullPath, (err) => {
          if (err) {
            console.error(err);
          }
        });
      });

      await Product.findByIdAndUpdate(id, product, {
        new: true,
      });
    } else {
      const product = {
        ...req?.body,
        images: isProduct?.images,
        slug: slugify(`${title}-${Date.now()}`),
        variants: JSON.parse(variants),
      };

      await Product.findByIdAndUpdate(id, product, {
        new: true,
      });
    }

    res.status(200).json({
      success: true,
      message: "Product updated successfully",
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

// get Flash products
exports.getFeaturedProducts = async (req, res) => {
  try {
    const products = await Product.find({ featured: true })
      .limit(req.query.limit)
      .sort({ createdAt: -1 })
      .populate("category subCategory subSubCategory", "name slug icon");

    res.status(200).json({
      success: true,
      message: "Featured Products fetched successfully",
      data: products,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};
