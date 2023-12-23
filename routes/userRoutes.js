const router = require("express").Router();
const multer = require("multer");
const verifyAdmin = require("../middleware/verifyAdmin");
const {
  registerUser,
  loginUser,
  getMe,
  getAllUsers,
  getAllCustomers,
  getAllAdmins,
  updateImage,
  updateInfo,
  deleteAnUser,
} = require("../controllers/userController");
const verifyToken = require("../middleware/verifyToken");
const { addAdministrator } = require("../controllers/administratorController");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/user");
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ storage: storage });

router.post("/add-admin", verifyAdmin, addAdministrator); // add new admin

router.post("/register", registerUser); //user info save database
router.post("/login", loginUser); //user login
router.get("/me", verifyToken, getMe); //get logged user
router.get("/allUsers", verifyAdmin, getAllUsers); //get all users
router.get("/allCustomers", verifyAdmin, getAllCustomers); //get all customers
router.get("/allAdmins", verifyAdmin, getAllAdmins); //get all admins

router.put(
  "/updateImage/:id",
  verifyToken,
  upload.single("image"),
  updateImage
);
router.put("/update/info/:id", verifyToken, updateInfo);

router.delete("/delete/:id", verifyAdmin, deleteAnUser);

module.exports = router;
