const fs = require("fs");
const Brand = require("../models/brandModel");
const slugify = require("slugify");

exports.addBrand = async (req, res) => {
  const icon = req?.file?.filename;

  try {
    if (!icon) {
      return res.status(400).json({
        success: false,
        error: "Brand icon is required",
      });
    }

    const brand = {
      icon,
      slug: slugify(req.body.name),
      ...req.body,
    };

    const result = await Brand.create(brand);

    res.status(200).json({
      success: true,
      message: "Brand created success",
      data: result,
    });
  } catch (error) {
    fs.unlink(`./uploads/brands/${icon}`, (err) => {
      if (err) {
        console.log(err);
      }
    });
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

exports.allBrands = async (req, res) => {
  try {
    const brands = await Brand.find({});
    res.status(200).json({
      success: true,
      message: "Brand get success",
      data: brands,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

exports.deleteBrand = async (req, res) => {
  const { id } = req.params;

  try {
    const brand = await Brand.findById(id);
    if (!brand) {
      return res.status(400).json({
        success: false,
        error: "Brand not found",
      });
    }

    await Brand.findByIdAndDelete(id);

    fs.unlink(`./uploads/brands/${brand?.icon}`, (err) => {
      if (err) {
        console.log(err);
      }
    });

    res.status(200).json({
      success: true,
      message: "Brand deleted successfully",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error,
    });
  }
};

exports.getBrandById = async (req, res) => {
  const { id } = req.params;

  try {
    const brand = await Brand.findById(id);

    res.status(200).json({
      success: true,
      message: "Brand fetched successfully",
      data: brand,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error,
    });
  }
};

exports.editBrand = async (req, res) => {
  const { id } = req.params;
  const data = req.body;
  const icon = req?.file?.filename;

  try {
    const brand = await Brand.findById(id);

    if (!brand) {
      return res.status(400).json({
        success: false,
        error: "Brand not found",
      });
    }

    let newData;
    if (icon) {
      fs.unlink(`./uploads/brands/${brand?.icon}`, (err) => {
        if (err) {
          console.log(err);
        }
      });

      newData = {
        ...data,
        icon,
        slug: slugify(data.name),
      };
    } else {
      newData = { ...data, slug: slugify(data.name) };
    }

    await Brand.findByIdAndUpdate(id, newData, {
      new: true,
    });

    res.status(200).json({
      success: true,
      message: "Brand updated successfully",
    });
  } catch (error) {
    fs.unlink(`./uploads/brands/${icon}`, (err) => {
      if (err) {
        console.log(err);
      }
    });
    res.status(400).json({
      success: false,
      error: error,
    });
  }
};
