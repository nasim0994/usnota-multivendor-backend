const express = require("express");
const router = express.Router();
const multer = require("multer");
const verifyAdmin = require("../../../middleware/verifyAdmin");
const {
  getWhySellHere,
  createWhySellHere,
  updateWhySellHere,
  getWhySellHereById,
  deleteWhySellHere,
} = require("../../../controllers/admin/sellerPage/whySellHere.controller");

// ---------Multer-------------------------
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/sellerWhySellHere");
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ storage: storage });
// -----------------------------------------

router.get("/", getWhySellHere);
router.post("/add", verifyAdmin, upload.single("icon"), createWhySellHere);
router.patch(
  "/update/:id",
  verifyAdmin,
  upload.single("icon"),
  updateWhySellHere
);

router.delete("/delete/:id", verifyAdmin, deleteWhySellHere);

router.get("/:id", getWhySellHereById);

module.exports = router;
