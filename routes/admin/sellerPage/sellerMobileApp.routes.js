const express = require("express");
const router = express.Router();
const multer = require("multer");
const verifyAdmin = require("../../../middleware/verifyAdmin");
const {
  getSellerMobileApp,
  createSellerMobileApp,
  updateSellerMobileApp,
} = require("../../../controllers/admin/sellerPage/sellerMobileApp.controller");

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

router.get("/", getSellerMobileApp);
router.post("/add", verifyAdmin, upload.single("image"), createSellerMobileApp);
router.patch(
  "/update/:id",
  verifyAdmin,
  upload.single("image"),
  updateSellerMobileApp
);

module.exports = router;
