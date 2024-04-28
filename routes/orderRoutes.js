const {
  addOrder,
  getOrdersByUserId,
  getOrderById,
  getAllOrders,
  deleteOrderById,
  getOrderByTransactionId,
  getSellerOrdersById,
  getSellerOrderByOrderId,
  updateSellerOrderStatus,
  updateStatusByAdmin,
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

router.patch("/admin/update-status/:id", updateStatusByAdmin);
router.patch("/seller/update-status/:id", updateSellerOrderStatus);

module.exports = router;
