const router = require("express").Router();
const multer = require("multer");
const {
  addCategory,
  getCategories,
  getCategory,
  updateCategory,
  deleteCategory,
  addSubCategory,
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

// category:
router.post("/addCategory", upload.single("icon"), addCategory);
router.get("/allCategories", getCategories);
router.get("/:id", getCategory);
router.patch("/updateCategory/:id", upload.single("icon"), updateCategory);
router.delete("/delete/:id", deleteCategory);

// ---------------------------------------------------------------------------------------------------------
// Sub category
// ---------------------------------------------------------------------------------------------------------
router.post("/addSubCategory", addSubCategory);


// Sub SubCategory:

module.exports = router;
