const { getSEO, addSEO, updateSEO } = require("../controllers/seoControllers");

const router = require("express").Router();

router.get("/", getSEO);
router.post("/add", addSEO);
router.patch("/update/:id", updateSEO);

module.exports = router;
