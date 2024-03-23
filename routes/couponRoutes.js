const express = require("express");
const router = express.Router();
const verifyAdmin = require("../middleware/verifyAdmin");
const {
  addCoupon,
  getCoupon,
  deleteCoupon,
  editCoupon,
  getCouponbyId,
  applyCoupon,
  updateStatus,
} = require("../controllers/couponController");

router.post("/add", verifyAdmin, addCoupon);
router.post("/apply", applyCoupon);
router.get("/all", getCoupon);
router.get("/single/:id", getCouponbyId);
router.patch("/edit/:id", editCoupon);
router.delete("/delete/:id", deleteCoupon);
router.put("/update/status/:id", updateStatus);

module.exports = router;
