const Product = require("../models/productModel");

exports.addProduct = async (req, res) => {
  const images = req.files.map((file) => file.filename);
  const {
    title,
    category,
    brand,
    stock,
    sellPrice,
    purchasePrice,
    description,
    formData,
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
    formData: JSON.parse(formData),
    colors: JSON.parse(colors),
    sizes: JSON.parse(sizes),
  };

  try {
    const result = await Product.create(product);
    res.status(201).json({
      status: "success",
      message: "Product added successfully",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      error: error.message,
    });
  }
};
