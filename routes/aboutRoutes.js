const express = require("express");
const router = express.Router();
const multer = require("multer");
const {
  getAboutUs,
  updateAboutUs,
  createAboutUs,
} = require("../controllers/aboutControllers");
const verifyAdmin = require("../middleware/verifyAdmin");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/aboutus");
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ storage: storage });

router.patch(
  "/update-about/:id",
  verifyAdmin,
  upload.single("image"),
  updateAboutUs
);

router.get("/", getAboutUs);

router.post("/add-about", verifyAdmin, upload.single("image"), createAboutUs);

module.exports = router;
