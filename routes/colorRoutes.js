const { getColors } = require("../controllers/colorControllers");
const router = require("express").Router();

router.get("/all-colors", getColors);

module.exports = router;
