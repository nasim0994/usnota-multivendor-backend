const multer = require("multer");
const {
  updateMainLogo,
  getLogos,
  getMainLogo,
  getDashboardLogo,
} = require("../controllers/logoController");
const verifyAdmin = require("../middleware/verifyAdmin");
const router = require("express").Router();

const storage = multer.diskStorage({
  destination: "upload/images/logos/",
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "-" + file.originalname);
  },
});

const upload = multer({
  storage,
});
module.exports = upload;

router.get("/all-logos", getLogos);
router.get("/main-logo", getMainLogo);
router.get("/dashboard-logo", getDashboardLogo);
router.put(
  "/update-logo/:id",
  verifyAdmin,
  upload.single("logo"),
  updateMainLogo
);

module.exports = router;
