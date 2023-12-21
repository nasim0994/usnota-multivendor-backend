const multer = require("multer");
const {
  addBanner,
  allBanners,
  deleteBanner,
} = require("../controllers/bannerController");
const verifyAdmin = require("../middleware/verifyAdmin");
const router = require("express").Router();

const storage = multer.diskStorage({
  destination: "upload/images/banners/",
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "-" + file.originalname);
  },
});

const upload = multer({
  storage,
});
module.exports = upload;

router.post("/add-banner", verifyAdmin, upload.single("image"), addBanner);
router.get("/all-banners", allBanners);
router.delete("/delete/:id", verifyAdmin, deleteBanner);

module.exports = router;
