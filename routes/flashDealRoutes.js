const {
  addFlashDeal,
  getAllFlashDeal,
  updateFlashDealstatus,
} = require("../controllers/flashDealControllers");

const router = require("express").Router();

router.post("/add-flashDeal", addFlashDeal);
router.get("/all", getAllFlashDeal);
router.put("/update-status/:id", updateFlashDealstatus);

module.exports = router;
