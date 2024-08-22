const express = require('express');
const { getUsers, deleteUser, getServices, deleteService } = require('../controllers/adminController');
const { protect, adminProtect } = require('../middlewares/authMiddleware');

const router = express.Router();

router.get('/users', protect, adminProtect, getUsers);
router.delete('/user', protect, adminProtect, deleteUser);
router.get('/services', protect, adminProtect, getServices);
router.delete('/service', protect, adminProtect, deleteService);

module.exports = router;
