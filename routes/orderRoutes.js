const router = require("express").Router();
const {
  addOrder,
  getAllOrders,
  getOrdersByUserId,
  getSingleOrder,
  updateStatusToPending,
  updateStatusToShipped,
} = require("../controllers/orderController");

router.post("/post-order", addOrder);
router.get("/all-orders", getAllOrders);
router.get("/:id", getSingleOrder);
router.get("/user-orders/:id", getOrdersByUserId);

// update order status
router.put("/pendingToShipped/:id", updateStatusToPending);
router.put("/shippedToDelivered/:id", updateStatusToShipped);

module.exports = router;
