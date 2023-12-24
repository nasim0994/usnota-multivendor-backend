const router = require("express").Router();
const multer = require("multer");
const { addProduct } = require("../controllers/productController");

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

module.exports = router;
