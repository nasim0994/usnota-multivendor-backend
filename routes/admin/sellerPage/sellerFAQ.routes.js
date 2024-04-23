const router = require("express").Router();
const {
  getSellerFAQ,
  addSellerFAQ,
  getSellerFAQById,
  updateSellerFAQ,
  deleteSellerFAQ,
} = require("../../../controllers/admin/sellerPage/sellerFAQ.controller");

router.get("/all", getSellerFAQ);
router.post("/add", addSellerFAQ);
router.get("/single/:id", getSellerFAQById);
router.patch("/update/:id", updateSellerFAQ);
router.delete("/delete/:id", deleteSellerFAQ);

module.exports = router;
