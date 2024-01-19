const Review = require("../models/reviewModel");
const Product = require("../models/productModel");
const User = require("../models/userModel");
const mongoose = require("mongoose");

exports.addReview = async (req, res) => {
  const { productId, rating, userId } = req?.body;

  if (!productId || !rating || !userId) {
    return res.status(400).json({
      success: false,
      error: "Invalid input. Please provide productId, rating, and studentId.",
    });
  }

  try {
    // -----------------check user-----------------------
    const user = await User.findById(userId);
    if (!user) {
      return res.status(400).json({
        success: false,
        error: "User not found",
      });
    }

    // -----------------check product---------------------
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(400).json({
        success: false,
        error: "Product not found",
      });
    }

    let review;
    const session = await mongoose.startSession();
    try {
      session.startTransaction();

      const totalRating = product?.rating ? product?.rating + rating : rating;
      const totalReviewer = product?.reviewer ? product?.reviewer + 1 : 1;

      const newRating = (totalRating / totalReviewer).toFixed(1);

      //   update product rating, reviewer
      await Product.findByIdAndUpdate(
        productId,
        {
          $set: {
            rating: newRating,
            reviewer: totalReviewer,
          },
        },
        { new: true }
      );

      //   add review
      review = await Review.create({
        ...req?.body,
        user: userId,
        product: productId,
      });

      await session.commitTransaction();
      await session.endSession();
    } catch (error) {
      console.error("Error adding review:", error);

      await session.abortTransaction();
      await session.endSession();

      return res.status(500).json({
        success: false,
        error: "Internal server error. Please try again later.",
      });
    }

    res.status(201).json({
      success: true,
      message: "Review added successfully",
      data: review,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error,
    });
  }
};

exports.updateReview = async (req, res) => {
  const { id, userId } = req.params;
  const data = req.body;

  try {
    const review = await Review.findById(id);

    if (!review) {
      return res.status(400).json({
        success: false,
        error: "Review not found",
      });
    }

    if (review.user.toString() !== userId) {
      return res.status(400).json({
        success: false,
        error: "You are not authorized to update this review",
      });
    }

    await Review.findByIdAndUpdate(id, data, { new: true });

    res.status(200).json({
      success: true,
      message: "Review updated successfully",
      data: review,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error,
    });
  }
};

exports.getReviewByProductId = async (req, res) => {
  const { productId } = req.params;

  try {
    const reviews = await Review.find({ product: productId }).populate("user");

    res.status(200).json({
      success: true,
      message: "Reviews fetched successfully",
      data: reviews,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error,
    });
  }
};

exports.deleteReview = async (req, res) => {
  const { id, userId } = req.params;

  try {
    const review = await Review.findById(id);

    if (!review) {
      return res.status(400).json({
        success: false,
        error: "Review not found",
      });
    }

    if (review.user.toString() !== userId) {
      return res.status(400).json({
        success: false,
        error: "You are not authorized to delete this review",
      });
    }

    await Review.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "Review deleted successfully",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error,
    });
  }
};
