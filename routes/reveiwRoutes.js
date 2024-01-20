const {
  addReview,
  getReviewsByProductId,
  updateReview,
  deleteReview,
  getReviewById,
  getReviewsByUserId,
  getAllReviews,
} = require("../controllers/reviewController");

const router = require("express").Router();

router.post("/add-review", addReview);

router.get('/get-all-reviews', getAllReviews)
router.get("/get-reviews-by-productId/:productId", getReviewsByProductId);
router.get("/get-reviews-by-user/:userId", getReviewsByUserId);

router.patch("/update-review/:id", updateReview);
router.delete("/delete-review/:id", deleteReview);
router.get("/:id", getReviewById);


module.exports = router;
