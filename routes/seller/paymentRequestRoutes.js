const router = require("express").Router();

const {
  createPaymentRequest,
  getPaymentRequest,
  getPaymentRequestBySellerId,
} = require("../../controllers/seller/paymentRequest.controller");
const verifyAdmin = require("../../middleware/verifyAdmin");

router.post("/add", createPaymentRequest);
router.get("/all", verifyAdmin, getPaymentRequest);
router.get("/seller/:id", verifyAdmin, getPaymentRequestBySellerId);

module.exports = router;
