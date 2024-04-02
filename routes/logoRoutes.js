const express = require("express");
const router = express.Router();
const multer = require("multer");
const verifyAdmin = require("../middleware/verifyAdmin");
const {
  addLogo,
  updateLogo,
  getLogos,
  addSellerLogo,
  getSellerLogos,
  updateSellerLogo,
} = require("../controllers/logoController");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/logo");
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ storage: storage });

router.post("/add-logo", verifyAdmin, upload.single("logo"), addLogo);
router.post(
  "/add-seller-logo",
  verifyAdmin,
  upload.single("logo"),
  addSellerLogo
);

router.patch(
  "/update-logo/:id",
  verifyAdmin,
  upload.single("logo"),
  updateLogo
);

router.patch(
  "/update-seller-logo/:id",
  verifyAdmin,
  upload.single("logo"),
  updateSellerLogo
);

router.get("/", getLogos);
router.get("/seller-logo", getSellerLogos);

module.exports = router;
