const express = require("express");
const router = express.Router();
const {
  getBusinessInfo,
  addBusinessInfo,
  updateBusinessInfo,
} = require("../controllers/businessInfoControllers");

router.get("/", getBusinessInfo);
router.post("/add-info", addBusinessInfo);
router.patch("/update-info/:id", updateBusinessInfo);

module.exports = router;
