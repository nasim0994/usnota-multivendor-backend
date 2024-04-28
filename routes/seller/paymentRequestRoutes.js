const router = require("express").Router();

const {
  createPaymentRequest,
  getPaymentRequest,
  getPaymentRequestBySellerId,
  transferBalanceByAdmin,
  acceptRequestByAdmin,
} = require("../../controllers/seller/paymentRequest.controller");
const verifyAdmin = require("../../middleware/verifyAdmin");

router.post("/add", createPaymentRequest);
router.get("/all", verifyAdmin, getPaymentRequest);
router.get("/seller/:id", verifyAdmin, getPaymentRequestBySellerId);

router.patch(
  "/accept-request/:requestId/:sellerId",
  verifyAdmin,
  acceptRequestByAdmin
);
router.patch("/transfer-balance/:id", verifyAdmin, transferBalanceByAdmin);

module.exports = router;
