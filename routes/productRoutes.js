const router = require("express").Router();
const multer = require("multer");
const {
  addProduct,
  getAllProducts,
  getProductById,
  getProductBySlug,
  deleteProductById,
} = require("../controllers/productController");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/products");
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage: storage }).array("images", 5);

router.get("/all-products", getAllProducts);

router.get("/:id", getProductById);

router.get("/getbyslug/:slug", getProductBySlug);

router.post("/add-product", upload, addProduct);

router.delete("/:id", deleteProductById);

module.exports = router;
