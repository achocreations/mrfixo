// /backend/routes/availabilityRoutes.js
const express = require('express');
const router = express.Router();
const { setAvailability, getAvailability } = require('../controllers/availabilityController');
const auth = require('../middleware/auth'); // Middleware to protect routes

router.post('/availability', auth, setAvailability); // Set availability
router.get('/availability/:providerId/:date', auth, getAvailability); // Get availability by provider and date

module.exports = router;
