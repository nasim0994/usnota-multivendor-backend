const { addReview } = require("../controllers/reviewController");

const router = require("express").Router();

router.post("/add-review", addReview);

module.exports = router;
