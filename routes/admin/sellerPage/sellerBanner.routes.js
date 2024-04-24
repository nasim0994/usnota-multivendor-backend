const express = require("express");
const router = express.Router();
const multer = require("multer");
const verifyAdmin = require("../../../middleware/verifyAdmin");
const {
  getSellerBanner,
  createSellerBanner,
  updateSellerBanner,
} = require("../../../controllers/admin/sellerPage/sellerBanner.controller");

// ---------Multer-------------------------
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/sellerBanner");
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ storage: storage });
// -----------------------------------------

router.get("/", getSellerBanner);
router.post("/add", verifyAdmin, upload.single("image"), createSellerBanner);
router.patch(
  "/update/:id",
  verifyAdmin,
  upload.single("image"),
  updateSellerBanner
);

module.exports = router;
