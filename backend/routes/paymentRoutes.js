// /backend/routes/paymentRoutes.js
const express = require('express');
const { createPaymentIntent, updatePaymentStatus } = require('../controllers/paymentController');
const { protect } = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/create-payment-intent', protect, createPaymentIntent);
router.post('/update-payment-status', protect, updatePaymentStatus);

module.exports = router;
