const {
  addFlashDeal,
  getAllFlashDeal,
} = require("../controllers/flashDealControllers");

const router = require("express").Router();

router.post("/add-flashDeal", addFlashDeal);
router.get("/all", getAllFlashDeal);

module.exports = router;
