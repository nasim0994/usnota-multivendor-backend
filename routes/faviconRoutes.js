const express = require("express");
const router = express.Router();
const multer = require("multer");
const {
  addFavicon,
  updateFavicon,
  getFavicon,
} = require("../controllers/faviconController");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/favicon");
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ storage: storage });

router.post("/add-favicon", upload.single("icon"), addFavicon);
router.patch("/update-favicon/:id", upload.single("icon"), updateFavicon);
router.get("/all", getFavicon);

module.exports = router;
