const router = require("express").Router();
const multer = require("multer");
const {
  addProduct,
  getAllProducts,
  getProductById,
  getProductBySlug,
  deleteProductById,
  updateProduct,
  getFeaturedProducts,
  getProductBySellerId,
  getPopularProducts,
} = require("../../controllers/seller/productController");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/products");
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ storage: storage }).array("images", 5);

router.post("/add-product", upload, addProduct);
router.get("/all-products", getAllProducts);
router.get("/popular-products", getPopularProducts);
router.get("/featured-products", getFeaturedProducts);

router.get("/:id", getProductById);
router.get("/getbyslug/:slug", getProductBySlug);
router.get("/seller/:id", getProductBySellerId);

router.patch("/update-product/:id", upload, updateProduct);
router.delete("/delete/:id", deleteProductById);

module.exports = router;
