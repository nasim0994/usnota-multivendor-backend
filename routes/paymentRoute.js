const router = require("express").Router();

const {
  initPayment,
  paymentSuccess,
  paymentFailed,
} = require("../controllers/paymentController");

// ssl payment
router.post("/ssl-payment", initPayment);

router.post("/payment-success", paymentSuccess);
router.post("/payment-fail", paymentFailed);

module.exports = router;
