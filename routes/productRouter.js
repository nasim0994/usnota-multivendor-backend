const router = require("express").Router();
const multer = require("multer");
const {
  addProduct,
  getAllProducts,
  deleteProduct,
  getFlashProducts,
  getSingleProduct,
  updateProduct,
  getSingleProductBySlug,
} = require("../controllers/productController");
const verifyAdmin = require("../middleware/verifyAdmin");

const storage = multer.diskStorage({
  destination: "upload/images/products/",
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "-" + file.originalname);
  },
});

const upload = multer({
  storage,
});
module.exports = upload;
//
router.post("/add-product", verifyAdmin, upload.single("image"), addProduct);
router.get("/all-products", getAllProducts);
router.get("/flash-products", getFlashProducts);
router.get("/:id", getSingleProduct);
router.get("/slug/:slug", getSingleProductBySlug);
router.put("/update-product/:id", upload.single("image"), updateProduct);

router.delete("/delete/:id", verifyAdmin, deleteProduct);

module.exports = router;
