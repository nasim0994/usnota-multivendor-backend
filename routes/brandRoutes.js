const express = require("express");
const router = express.Router();
const multer = require("multer");
const verifyAdmin = require("../middleware/verifyAdmin");
const {
  addBrand,
  allBrands,
  deleteBrand,
  getBrandById,
  editBrand,
} = require("../controllers/brandControllers");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/brands");
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ storage: storage });

router.post("/add", verifyAdmin, upload.single("icon"), addBrand);
router.get("/allBrands", allBrands);
router.get("/single/:id", getBrandById);
router.patch("/edit/:id", verifyAdmin, upload.single("icon"), editBrand);
router.delete("/delete/:id", verifyAdmin, deleteBrand);

module.exports = router;
