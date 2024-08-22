const Service = require('../models/Service');
const { ErrorResponse } = require('../utils/errorHandler');
const logger = require('../utils/logger');

// @desc    Create new service
// @route   POST /api/services
// @access  Private/Provider
exports.createService = async (req, res, next) => {
    try {
        req.body.provider = req.user.id;

        const service = await Service.create(req.body);

        res.status(201).json({
            success: true,
            data: service
        });

        logger.info(`Service created by provider: ${req.user.id}`);
    } catch (err) {
        next(err);
    }
};

// @desc    Get single service
// @route   GET /api/services/:id
// @access  Public
exports.getService = async (req, res, next) => {
    try {
        const service = await Service.findById(req.params.id).populate('provider', 'name email');

        if (!service) {
            return next(new ErrorResponse(`Service not found with id of ${req.params.id}`, 404));
        }

        res.status(200).json({
            success: true,
            data: service
        });

        logger.info(`Retrieved service with id: ${req.params.id}`);
    } catch (err) {
        next(err);
    }
};

// @desc    Update service
// @route   PUT /api/services/:id
// @access  Private
exports.updateService = async (req, res, next) => {
    try {
        const service = await Service.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });

        if (!service) {
            return next(new ErrorResponse(`Service not found with id ${req.params.id}`, 404));
        }

        res.status(200).json({ success: true, data: service });
    } catch (err) {
        logger.error(`Error updating service: ${err.message}`);
        next(new ErrorResponse('Unable to update service', 500));
    }
};

// @desc    Search service
// @route   GET /api/services/:id
// @access  Public
exports.searchServices = async (req, res) => {
    try {
        const { searchTerm, location, priceRange } = req.query;
        const filters = {
            ...(searchTerm && { name: { $regex: searchTerm, $options: 'i' } }),
            ...(location && { location }),
            ...(priceRange && { price: { $gte: priceRange[0], $lte: priceRange[1] } }),
        };
        
        const services = await Service.find(filters);
        res.status(200).json({ success: true, data: service });
    } catch (err) {
        next(err);
    }
};

// @desc    Search service
// @route   GET /api/services/:id
// @access  Public
exports.findNearbyServices = async (req, res) => {
    try {
        const { latitude, longitude, distance } = req.query;
        
        const services = await Service.find({
            location: {
                $geoWithin: {
                    $centerSphere: [[longitude, latitude], distance / 3963.2] // convert miles to radians
                }
            }
        });
        
        res.status(200).json(services);
    } catch (err) {
        next(err);
    }
};
  
  