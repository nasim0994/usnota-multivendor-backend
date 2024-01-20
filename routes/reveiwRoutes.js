const { addReview, getReviewsByProductId, updateReview, deleteReview, getReviewById } = require("../controllers/reviewController");

const router = require("express").Router();

router.post("/add-review", addReview);

router.get('/get-reviews/:productId', getReviewsByProductId)
router.patch('/update-review/:id', updateReview)
router.delete('/delete-review/:id', deleteReview)
router.get('/:id', getReviewById)

module.exports = router;
