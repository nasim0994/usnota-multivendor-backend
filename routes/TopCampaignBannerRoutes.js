const express = require("express");
const router = express.Router();
const multer = require("multer");
const verifyAdmin = require("../middleware/verifyAdmin");
const {
  addTopCampaignBanner,
  getTopCampaignBanner,
  updateBanner,
} = require("../controllers/topCampaignBannerControllers");

// File Updload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/banner");
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ storage: storage });

router.post("/add", verifyAdmin, upload.single("image"), addTopCampaignBanner);
router.patch("/update/:id", verifyAdmin, upload.single("image"), updateBanner);

router.get("/", getTopCampaignBanner);

module.exports = router;
