const {
  addOrder,
  getOrdersByUserId,
  getOrderById,
  getAllOrders,
  deleteOrderById,
  updateStatus,
} = require("../controllers/orderController");

const router = require("express").Router();

router.post("/post-order", addOrder);
router.get("/all-orders", getAllOrders);
router.get("/:id", getOrderById);
router.get("/user-orders/:id", getOrdersByUserId);

router.delete("/:id", deleteOrderById);

router.patch("/update-status/:id", updateStatus);

// router.put("/pendingToShipped/:id", updateStatusToPending);
// router.put("/shippedToDelivered/:id", updateStatusToShipped);

module.exports = router;
