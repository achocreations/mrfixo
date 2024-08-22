// /backend/controllers/adminController.js

const { ErrorResponse } = require('../utils/errorHandler');
const logger = require('../utils/logger');

exports.getAllServices = async (req, res) => {
    try {
        const services = await Service.find();
        res.status(200).json({
            success: true,
            data: services 
        });

        logger.info('Retrieved all services');
    } catch (err) {
        next(err);
    }
};

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

// @desc    Get all users
// @route   GET /api/users
// @access  Private/Admin
exports.getUsers = async (req, res, next) => {
    try {
        const users = await User.find();

        res.status(200).json({
            success: true,
            data: users
        });

        logger.info('Retrieved all users');
    } catch (err) {
        next(err);
    }
};

// @desc    Update user
// @route   PUT /api/users/:id
// @access  Private/Admin
exports.updateUser = async (req, res, next) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });

        if (!user) {
            return next(new ErrorResponse(`User not found with id ${req.params.id}`, 404));
        }

        res.status(200).json({ success: true, data: user });
    } catch (err) {
        logger.error(`Error updating user: ${err.message}`);
        next(new ErrorResponse('Unable to update user', 500));
    }
};

// @desc    Delete user
// @route   DELETE /api/users/:id
// @access  Private/Admin
exports.deleteUser = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id);

        if (!user) {
            return next(new ErrorResponse(`User not found with id of ${req.params.id}`, 404));
        }

        await user.remove();

        res.status(200).json({
            success: true,
            data: {}
        });

        logger.info(`Deleted user with id: ${req.params.id}`);
    } catch (err) {
        next(err);
    }
};
  