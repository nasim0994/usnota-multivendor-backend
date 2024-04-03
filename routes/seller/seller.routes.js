const router = require("express").Router();
const multer = require("multer");
const verifyToken = require("../../middleware/verifyToken");
const {
  registerSeller,
  loginSeller,
  getsellerByToken,
  getsellerById,
  getAllSellers,
  toggleSellerVerify,
  updateInfoForVerify,
} = require("../../controllers/seller/seller.controllers");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/seller/profile");
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ storage: storage });

router.post("/register", registerSeller);
router.post("/login", loginSeller);
router.get("/me", verifyToken, getsellerByToken);
router.get("/all-sellers", getAllSellers);
router.get("/:id", getsellerById);
router.put("/toggle-verify/:id", toggleSellerVerify);
router.patch(
  "/update/verify/:id",
  upload.single("idCard"),
  updateInfoForVerify
);

module.exports = router;
