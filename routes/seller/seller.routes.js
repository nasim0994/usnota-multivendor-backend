const router = require("express").Router();
const multer = require("multer");
const verifyToken = require("../../middleware/verifyToken");
const {
  registerSeller,
  loginSeller,
  getsellerByToken,
  getsellerById,
} = require("../../controllers/seller/seller.controllers");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/seller");
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ storage: storage });

router.post("/register", registerSeller);
router.post("/login", loginSeller);
router.get("/me", verifyToken, getsellerByToken);
router.get("/all-sellers", getsellerById);
router.get("/:id", getsellerById);

module.exports = router;
