const router = require("express").Router();
const verifyAdmin = require("../middleware/verifyAdmin");
const verifyToken = require("../middleware/verifyToken");
const {
  updateProfile,
  addAdmin,
  getAllAdmins,
  deleteAdmin,
  getAdminById,
  updatePassword,
} = require("../controllers/adminControllers");

router.get("/allAdmins", verifyAdmin, getAllAdmins);
router.get("/:id", verifyAdmin, getAdminById);
router.post("/add-admin", verifyAdmin, addAdmin);
router.delete("/delete/:id", verifyAdmin, deleteAdmin);
router.patch("/update/password/:id", verifyToken, updatePassword);
router.patch("/update/profile/:id", verifyToken, updateProfile);

module.exports = router;
