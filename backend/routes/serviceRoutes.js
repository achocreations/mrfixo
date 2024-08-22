const express = require('express');
const { 
    createService, 
    getAllServices, 
    getService, 
    updateService, 
    deleteService 
} = require('../controllers/serviceController');
const { validateService } = require('../utils/validators');

const router = express.Router();

router.post('/', validateService, createService);
router.get('/', protect, restrictTo('admin'), getAllServices);
router.get('/:id', getService);
router.update('/:id', updateService);
router.delete('/:id', protect, restrictTo('admin'), deleteService);
router.get('/search', searchServices);

module.exports = router;
