const {
  getShippingConfig,
  addShippingConfig,
  updateShippingConfig,
} = require("../controllers/shippingConfigControllers");

const router = require("express").Router();

router.get("/", getShippingConfig);
router.post("/add", addShippingConfig);
router.patch("/update/:id", updateShippingConfig);

module.exports = router;
