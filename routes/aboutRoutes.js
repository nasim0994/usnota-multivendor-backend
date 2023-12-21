const router = require("express").Router();
const multer = require("multer");
const verifyAdmin = require("../middleware/verifyAdmin");

const { updateAbout, getAbout } = require("../controllers/aboutControllers");

const storage = multer.diskStorage({
  destination: "upload/images/about/",
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "-" + file.originalname);
  },
});
const upload = multer({
  storage,
});
module.exports = upload;

router.put(
  "/update-about/:id",
  verifyAdmin,
  upload.single("image"),
  updateAbout
);
router.get("/", getAbout);

module.exports = router;
