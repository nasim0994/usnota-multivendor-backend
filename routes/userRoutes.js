const router = require("express").Router();
const multer = require("multer");
const verifyAdmin = require("../middleware/verifyAdmin");
const verifyToken = require("../middleware/verifyToken");
const {
  registerUser,
  loginUser,
  getMe,
  getAllUsers,
  getAllCustomers,
  updateImage,
  updateInfo,
  deleteAnUser,
} = require("../controllers/userController");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/user");
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ storage: storage });

router.post("/register", registerUser); //user info save database
router.post("/login", loginUser); //user login
router.get("/me", verifyToken, getMe); //get logged user
router.get("/allUsers", verifyAdmin, getAllUsers); //get all users
router.get("/allCustomers", verifyAdmin, getAllCustomers); //get all customers

router.put(
  "/updateImage/:id",
  verifyToken,
  upload.single("image"),
  updateImage
);
router.put("/update/info/:id", verifyToken, updateInfo);
router.delete("/delete/:id", verifyAdmin, deleteAnUser);

module.exports = router;
