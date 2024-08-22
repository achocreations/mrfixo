// /backend/routes/chatRoutes.js
const express = require('express');
const { fetchMessages, sendMessage } = require('../controllers/chatController');
const { protect } = require('../middlewares/authMiddleware');

const router = express.Router();

router.get('/:conversationId', protect, fetchMessages);
router.post('/send', protect, sendMessage);

module.exports = router;
