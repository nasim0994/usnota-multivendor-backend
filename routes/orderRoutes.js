const {
  addOrder,
  getOrdersByUserId,
  getOrderById,
  getAllOrders,
  deleteOrderById,
  updateStatus,
  getOrderByTransactionId,
  getSellerOrdersById,
  getOrdersSeparateSeller,
  getSellerOrderBySellerIdOrderId,
  getSellerOrderByOrderId,
} = require("../controllers/orderController");

const router = require("express").Router();

router.post("/post-order", addOrder);
router.get("/all-orders", getAllOrders);

router.get("/:id", getOrderById);
router.get("/user-orders/:id", getOrdersByUserId);
router.get("/transaction/:transactionId", getOrderByTransactionId);

router.get("/seller-orders/:id", getSellerOrdersById);
router.get("/seller-order/single/:id", getSellerOrderByOrderId);

router.delete("/:id", deleteOrderById);

router.patch("/update-status/:id", updateStatus);

module.exports = router;
