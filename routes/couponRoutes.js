const express = require("express");
const router = express.Router();
const verifyAdmin = require("../middleware/verifyAdmin");
const {
  addCoupon,
  getCoupon,
  deleteCoupon,
  editCoupon,
  getCouponbyId,
} = require("../controllers/couponController");

router.post("/add", verifyAdmin, addCoupon);
router.get("/all", getCoupon);
router.get("/single/:id", getCouponbyId);
router.patch("/edit/:id", editCoupon);
router.delete("/delete/:id", deleteCoupon);

module.exports = router;
