const router = require("express").Router();
const multer = require("multer");
const {
  registerUser,
  loginUser,
  getMe,
  updateImage,
  updateInfo,
  getAllUsers,
  getAllCustomers,
  getAllAdmins,
  deleteAnUser,
  addAdmin,
} = require("../controllers/userController");
const verifyToken = require("../middleware/verifyToken");
const verifyAdmin = require("../middleware/verifyAdmin");

const storage = multer.diskStorage({
  destination: "upload/images/users/",
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "-" + file.originalname);
  },
});

const upload = multer({
  storage,
});
module.exports = upload;

router.post("/add-admin", verifyAdmin, addAdmin); // add new admin
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
