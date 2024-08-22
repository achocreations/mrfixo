const Review = require('../models/Review');
const { ErrorResponse } = require('../utils/errorHandler');
const logger = require('../utils/logger');

// @desc    Get all reviews
// @route   GET /api/reviews
// @access  Public
exports.getReviews = async (req, res, next) => {
    try {
        const reviews = await Review.find();
        res.status(200).json({ success: true, data: reviews });
    } catch (err) {
        logger.error(`Error fetching reviews: ${err.message}`);
        next(new ErrorResponse('Unable to fetch reviews', 500));
    }
};

// @desc    Get single review
// @route   GET /api/reviews/:id
// @access  Public
exports.getReview = async (req, res, next) => {
    try {
        const review = await Review.findById(req.params.id);

        if (!review) {
            return next(new ErrorResponse(`Review not found with id ${req.params.id}`, 404));
        }

        res.status(200).json({ success: true, data: review });
    } catch (err) {
        logger.error(`Error fetching review: ${err.message}`);
        next(new ErrorResponse('Unable to fetch review', 500));
    }
};

// @desc    Add review
// @route   POST /api/reviews
// @access  Private
exports.addReview = async (req, res, next) => {
    try{
        const { serviceId, comment, rating } = req.body;
        const review = new Review({
            serviceId,
            userId: req.user.id,
            userName: req.user.name,
            comment,
            rating,
          });
          await review.save();
          res.status(201).json({ success: true, data: review });
    } catch (err) {
        logger.error(`Error creating review: ${err.message}`);
        next(new ErrorResponse('Unable to create review', 500));
    }
  };

// @desc    Update review
// @route   PUT /api/reviews/:id
// @access  Private
exports.updateReview = async (req, res, next) => {
    try{
        const review = await Review.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });

        if (!review) {
            return next(new ErrorResponse(`Review not found with id ${req.params.id}`, 404));
        }

        res.status(200).json({ success: true, data: review });
    } catch (err) {
        logger.error(`Error updating review: ${err.message}`);
        next(new ErrorResponse('Unable to update review', 500));
    }
};
   
// @desc    Delete review
// @route   DELETE /api/reviews/:id
// @access  Private
exports.deleteReview = async (req, res, next) => {
    try {
        const review = await Review.findById(req.params.id);

        if (!review) {
            return next(new ErrorResponse(`Review not found with id of ${req.params.id}`, 404));
        }

        if (review.provider.toString() !== req.user.id) {
            return next(new ErrorResponse(`User not authorized to delete this review`, 401));
        }

        await review.remove();

        res.status(200).json({
            success: true,
            data: {}
        });

        logger.info(`Deleted review with id: ${req.params.id}`);
    } catch (err) {
        next(err);
    }
};