const fs = require("fs");
const slugify = require("slugify");
const Categories = require("../models/categoriesModel");
const SubCategory = require("../models/subCategoryModel");
const SubSubCategory = require("../models/subSubCategoryModel");

// ---------------------------------------------------------------------------------------------------------
// category
// ---------------------------------------------------------------------------------------------------------

exports.addCategory = async (req, res) => {
  try {
    const { name, order } = req.body;
    const icon = req?.file?.filename ? req.file.filename : "";

    const category = {
      name,
      order,
      slug: slugify(name),
      icon,
    };

    const result = await Categories.create(category);

    res.status(200).json({
      success: true,
      message: "Category created successfully",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

exports.getCategories = async (req, res) => {
  try {
    let categories = await Categories.find({})
      .sort({ order: 1 })
      .populate({
        path: "subCategories",
        populate: {
          path: "subSubCategories",
          select: "name slug category subCategory",
        },
        select: "name slug category",
      });

    res.status(200).json({
      success: true,
      message: "All categories",
      data: categories,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

exports.getCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await Categories.findOne({ _id: id }).populate(
      "subCategories",
      "name slug"
    );

    res.status(200).json({
      success: true,
      message: "Category found successfully",
      data: category,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

exports.updateCategory = async (req, res) => {
  try {
    const { id } = req?.params;
    const data = req?.body;
    const icon = req.file?.filename;

    const category = await Categories.findById(id);
    const categoryIcon = category?.icon;

    let categoryData;

    if (icon) {
      categoryData = {
        ...data,
        slug: slugify(data?.name),
        icon: icon,
      };
    } else {
      categoryData = {
        ...data,
        slug: slugify(data?.name),
        icon: categoryIcon,
      };
    }

    const result = await Categories.findByIdAndUpdate(id, categoryData, {
      new: true,
    });

    if (icon && categoryIcon) {
      fs.unlink(`./uploads/categories/${categoryIcon}`, (err) => {
        if (err) {
          console.log(err);
        }
      });
    }

    res.status(200).json({
      success: true,
      message: "Category updated successfully",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

exports.deleteCategory = async (req, res) => {
  try {
    const { id } = req?.params;
    const category = await Categories.findById(id);

    if (!category) {
      return res.status(400).json({
        success: false,
        error: "Category not found",
      });
    }
    const categoryIcon = category?.icon;

    if (categoryIcon) {
      fs.unlink(`./uploads/categories/${categoryIcon}`, (err) => {
        if (err) {
          console.log(err);
        }
      });
    }

    if (category?.subCategories?.length > 0) {
      const subCategory = await SubCategory.find({
        _id: { $in: category?.subCategories },
      });

      const subSubCategoryIds = subCategory.reduce((acc, subCategory) => {
        acc.push(
          ...subCategory.subSubCategories.map(
            (subSubCategory) => subSubCategory._id
          )
        );
        return acc;
      }, []);
      await SubSubCategory.deleteMany({ _id: { $in: subSubCategoryIds } });
    }

    if (category?.subCategories?.length > 0) {
      await SubCategory.deleteMany({
        _id: { $in: category.subCategories },
      });
    }

    await Categories.deleteOne({ _id: id });

    res.status(200).json({
      success: true,
      message: "Delete success",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

// ---------------------------------------------------------------------------------------------------------
// Sub category
// ---------------------------------------------------------------------------------------------------------

exports.addSubCategory = async (req, res) => {
  try {
    const { name, categoryId } = req.body;
    const sub_category = {
      name,
      category: categoryId,
      slug: slugify(`${name}_${Date.now()}`),
    };

    const result = await SubCategory.create(sub_category);
    await Categories.updateOne(
      { _id: categoryId },
      { $push: { subCategories: result?._id } }
    );

    res.status(200).json({
      success: true,
      message: "Sub Category created successfully",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

exports.updateSubCategory = async (req, res) => {
  try {
    const { id } = req?.params;
    const { name } = req?.body;

    const subCategory = await SubCategory.findById(id);

    if (!subCategory) {
      return res.status(400).json({
        success: false,
        error: "Sub Category not found",
      });
    }

    await SubCategory.updateOne(
      { _id: id },
      { name: name, slug: slugify(`${name}-${Date.now()}`) }
    );

    res.status(200).json({
      success: true,
      message: "Sub Category updated success",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

exports.deleteSubCategory = async (req, res) => {
  try {
    const { id } = req?.params;
    const { categoryId } = req?.body;
    const subCategory = await SubCategory.findById(id);

    if (!subCategory) {
      return res.status(400).json({
        success: false,
        error: "Sub Category not found!",
      });
    }

    await SubCategory.deleteOne({ _id: id });
    await Categories.updateOne(
      { _id: categoryId },
      { $pull: { subCategories: id } }
    );

    if (subCategory?.subSubCategories?.length > 0) {
      await SubSubCategory.deleteMany({
        _id: { $in: subCategory.subSubCategories },
      });
    }

    res.status(200).json({
      success: true,
      error: "Sub Category delete success",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

exports.getSubCategories = async (req, res) => {
  try {
    let subCategories = await SubCategory.find({}, "name slug").populate(
      "category",
      "name icon"
    );

    res.status(200).json({
      success: true,
      message: "Sub Category get success",
      data: subCategories,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

exports.getSubCategoryById = async (req, res) => {
  try {
    const { id } = req.params;

    const subCategory = await SubCategory.findOne({ _id: id }).populate(
      "category subSubCategories",
      "name slug icon"
    );

    res.status(200).json({
      success: true,
      data: subCategory,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

// ---------------------------------------------------------------------------------------------------------
// Sub SubCategory
// ---------------------------------------------------------------------------------------------------------

exports.addSubSubCategory = async (req, res) => {
  try {
    const { name, categoryId, subCategoryId } = req.body;
    const sub_subCategory = {
      name,
      slug: slugify(`${name}_${Date.now()}`),
      category: categoryId,
      subCategory: subCategoryId,
    };

    const result = await SubSubCategory.create(sub_subCategory);
    await SubCategory.updateOne(
      { _id: subCategoryId },
      { $push: { subSubCategories: result?._id } }
    );

    res.status(200).json({
      success: true,
      message: "Sub SubCategory created success",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

exports.updateSubSubCategory = async (req, res) => {
  try {
    const { id } = req?.params;
    const { name } = req?.body;

    const subSubCategory = await SubSubCategory.findById(id);

    if (!subSubCategory) {
      return res.status(400).json({
        success: false,
        error: "Sub Sub Category not found",
      });
    }

    await SubSubCategory.updateOne(
      { _id: id },
      { name: name, slug: slugify(`${name}-${Date.now()}`) }
    );

    res.status(200).json({
      success: true,
      message: "Sub Sub Category updated success",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

exports.deleteSubSubCategory = async (req, res) => {
  try {
    const { id } = req?.params;
    const { subCategoryId } = req?.body;
    const subSubCategory = await SubSubCategory.findById(id);

    if (!subSubCategory) {
      return res.status(400).json({
        success: false,
        error: "Sub SubCategory not found!",
      });
    }

    await SubSubCategory.deleteOne({ _id: id });
    await SubCategory.updateOne(
      { _id: subCategoryId },
      { $pull: { subSubCategories: id } }
    );

    res.status(200).json({
      success: true,
      error: "Sub SubCategory delete success",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

exports.getSubSubCategories = async (req, res) => {
  try {
    let subSubCategories = await SubSubCategory.find({}).populate(
      "category subCategory",
      "name slug icon"
    );

    res.status(200).json({
      success: true,
      message: "Sub Category get success",
      data: subSubCategories,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

exports.getSubSubCategoryById = async (req, res) => {
  try {
    const { id } = req.params;

    const subSubCategory = await SubSubCategory.findOne({ _id: id });

    res.status(200).json({
      success: true,
      data: subSubCategory,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};
