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

// @desc    Get all services
// @route   GET /api/services
// @access  Public
exports.getServices = async (req, res, next) => {
    try {
        const services = await Service.find().populate('provider', 'name email');

        res.status(200).json({
            success: true,
            data: services
        });

        logger.info('Retrieved all services');
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

// @desc    Delete service
// @route   DELETE /api/services/:id
// @access  Private/Provider
exports.deleteService = async (req, res, next) => {
    try {
        const service = await Service.findById(req.params.id);

        if (!service) {
            return next(new ErrorResponse(`Service not found with id of ${req.params.id}`, 404));
        }

        if (service.provider.toString() !== req.user.id) {
            return next(new ErrorResponse(`User not authorized to delete this service`, 401));
        }

        await service.remove();

        res.status(200).json({
            success: true,
            data: {}
        });

        logger.info(`Deleted service with id: ${req.params.id}`);
    } catch (err) {
        next(err);
    }
};
