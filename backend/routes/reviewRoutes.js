const express = require('express');
const { 
    addReview, 
    getReviews, 
    getReview, 
    updateReview, 
    deleteReview 
} = require('../controllers/reviewController');
const { validateReview } = require('../utils/validators');

const router = express.Router();

router.post('/', validateReview, addReview);
router.get('/', getReviews);
router.get('/:id', getReview);
router.update('/:id', protect, restrictTo('admin'), updateReview);
router.delete('/:id', protect, restrictTo('admin'), deleteReview);

module.exports = router;
