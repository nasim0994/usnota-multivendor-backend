const express = require("express");
const router = express.Router();
const multer = require("multer");
const verifyAdmin = require("../middleware/verifyAdmin");
const {
  addBanner,
  allBanners,
  deleteBanner,
} = require("../controllers/bannerController");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/banner");
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ storage: storage });

router.post("/add-banner", verifyAdmin, upload.single("image"), addBanner);
router.get("/all-banners", allBanners);
router.delete("/delete/:id", verifyAdmin, deleteBanner);

module.exports = router;
