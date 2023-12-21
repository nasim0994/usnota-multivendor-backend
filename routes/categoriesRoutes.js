const router = require("express").Router();
const multer = require("multer");
const {
  addCategory,
  getCategories,
  deleteCategory,
  updateCategory,
  getCategory,
} = require("../controllers/categoriesController");

const storage = multer.diskStorage({
  destination: "upload/images/categories/",
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "-" + file.originalname);
  },
});

const upload = multer({
  storage,
});
module.exports = upload;

router.post("/addCategory", upload.single("icon"), addCategory);
router.get("/allCategories", getCategories);
router.get("/:id", getCategory);

router.put("/updateCategory/:id", upload.single("icon"), updateCategory);
router.delete("/delete/:id", deleteCategory);

module.exports = router;
