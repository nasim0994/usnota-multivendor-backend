const slugify = require("slugify");
const fs = require("fs");
const Product = require("../models/productModel");

exports.addProduct = async (req, res) => {
  try {
    const data = req.body;
    const image = req?.file?.filename;

    const newData = {
      ...data,
      image,
    };

    const result = await Product.create(newData);

    res.status(200).json({
      success: true,
      message: "Product created successfully",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

exports.getSingleProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);

    res.status(200).json({
      status: true,
      message: "Product found",
      data: product,
    });
  } catch (error) {
    res.status(400).json({
      status: false,
      message: error.message,
    });
  }
};

exports.getSingleProductBySlug = async (req, res) => {
  try {
    const { slug } = req.params;
    const product = await Product.findByPk(slug, { include: [Variant] });

    res.status(200).json({
      status: true,
      data: product,
    });
  } catch (error) {
    res.status(400).json({
      status: false,
      message: error.message,
    });
  }
};

exports.getAllProducts = async (req, res) => {
  try {
    const { category } = req.query;
    let query = {};
    if (category && category !== "") {
      query.category = category;
    }

    const products = await Product.findAll({
      where: query,
      include: [Variant],
    });

    res.status(200).json({
      success: true,
      data: products,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const productInfo = req.body;
    const newImage = req.file?.filename;
    const variantsParse =
      productInfo?.variants && JSON.parse(productInfo?.variants);

    const product = await Product.findOne({ where: { id: id } });
    const productImage = product?.image;

    if (!product) {
      return res.status(400).json({
        status: false,
        message: "product not found",
      });
    }

    if (newImage && productImage) {
      fs.unlinkSync("upload/images/products/" + productImage);
    }

    if (variantsParse) {
      for (const variant of variantsParse) {
        const { size, colorName, colorCode, quantity } = variant;
        const productVariant = await Variant.findOne({
          where: {
            productId: id,
            size,
            colorName,
          },
        });

        if (!productVariant) {
          await product.createProductVariant({
            size,
            colorName,
            colorCode,
            quantity,
          });
        } else {
          productVariant.quantity = quantity;
          await productVariant.save();
        }
      }
    }

    if (newImage) {
      await Product.update(
        { ...productInfo, image: newImage },
        { where: { id: id } }
      );
      res.status(200).json({
        success: true,
        message: "Update success",
      });
    } else {
      await Product.update(
        { ...productInfo, image: productImage },
        { where: { id: id } }
      );

      res.status(200).json({
        success: true,
        message: "Update success",
      });
    }
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

exports.deleteProduct = async (req, res) => {
  
}


exports.getFlashProducts = async (req, res) => {
  try {
    const products = await Product.find({ discount: { $gte: 10 } })
      .limit(5)
      .exec();

    res.status(200).json({
      success: true,
      message: "Get flash products success",
      data: products,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};
