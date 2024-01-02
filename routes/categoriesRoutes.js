const router = require("express").Router();
const multer = require("multer");
const {
  addCategory,
  getCategories,
  getCategory,
  updateCategory,
  deleteCategory,
  addSubCategory,
  addSubSubCategory,
  updateSubCategory,
  updateSubSubCategory,
  deleteSubSubCategory,
  deleteSubCategory,
  getSubCategories,
  getSubCategoryById,
  getSubSubCategories,
  getSubSubCategoryById,
} = require("../controllers/categoriesController");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/categories");
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ storage: storage });

// Category:
router.post("/addCategory", upload.single("icon"), addCategory);
router.get("/allCategories", getCategories);

// Sub Category:
router.post("/addSubCategory", addSubCategory);
router.get("/allSubCategories", getSubCategories);

// Sub SubCategory:
router.post("/addSubSubCategory", addSubSubCategory);
router.get("/allSubSubCategories", getSubSubCategories);

// Category:
router.get("/category/:id", getCategory);
router.patch("/updateCategory/:id", upload.single("icon"), updateCategory);
router.delete("/deleteCategory/:id", deleteCategory);

// Sub Category:
router.get("/subCategory/:id", getSubCategoryById);
router.patch("/updateSubCategory/:id", updateSubCategory);
router.delete("/deleteSubCategory/:id", deleteSubCategory);

// Sub Sub Category:
router.get("/subSubCategory/:id", getSubSubCategoryById);
router.patch("/updateSubSubCategory/:id", updateSubSubCategory);
router.delete("/deleteSubSubCategory/:id", deleteSubSubCategory);

module.exports = router;
