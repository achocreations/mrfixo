const express = require('express');
const { 
    createService, 
    getServices, 
    getService, 
    updateService, 
    deleteService 
} = require('../controllers/serviceController');
const { validateService } = require('../utils/validators');

const router = express.Router();

router.post('/', validateService, createService);
router.get('/', getServices);
router.get('/:id', getService);
router.update('/:id', updateService);
router.delete('/:id', deleteService);

module.exports = router;
