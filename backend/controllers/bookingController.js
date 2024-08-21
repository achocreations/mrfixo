const Booking = require('../models/Booking');
const { ErrorResponse } = require('../utils/errorHandler');
const logger = require('../utils/logger');

// @desc    Get all bookings
// @route   GET /api/bookings
// @access  Private
exports.getBookings = async (req, res, next) => {
    try {
        const bookings = await Booking.find();
        res.status(200).json({ success: true, data: bookings });
    } catch (err) {
        logger.error(`Error fetching bookings: ${err.message}`);
        next(new ErrorResponse('Unable to fetch bookings', 500));
    }
};

// @desc    Get single booking
// @route   GET /api/bookings/:id
// @access  Private
exports.getBooking = async (req, res, next) => {
    try {
        const booking = await Booking.findById(req.params.id);

        if (!booking) {
            return next(new ErrorResponse(`Booking not found with id ${req.params.id}`, 404));
        }

        res.status(200).json({ success: true, data: booking });
    } catch (err) {
        logger.error(`Error fetching booking: ${err.message}`);
        next(new ErrorResponse('Unable to fetch booking', 500));
    }
};

// @desc    Create booking
// @route   POST /api/bookings
// @access  Private
exports.createBooking = async (req, res, next) => {
    try {
        const booking = await Booking.create(req.body);
        res.status(201).json({ success: true, data: booking });
    } catch (err) {
        logger.error(`Error creating booking: ${err.message}`);
        next(new ErrorResponse('Unable to create booking', 500));
    }
};

// @desc    Update booking
// @route   PUT /api/bookings/:id
// @access  Private
exports.updateBooking = async (req, res, next) => {
    try {
        const booking = await Booking.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });

        if (!booking) {
            return next(new ErrorResponse(`Booking not found with id ${req.params.id}`, 404));
        }

        res.status(200).json({ success: true, data: booking });
    } catch (err) {
        logger.error(`Error updating booking: ${err.message}`);
        next(new ErrorResponse('Unable to update booking', 500));
    }
};

// @desc    Delete booking
// @route   DELETE /api/bookings/:id
// @access  Private
exports.deleteBooking = async (req, res, next) => {
    try {
        const booking = await Booking.findByIdAndDelete(req.params.id);

        if (!booking) {
            return next(new ErrorResponse(`Booking not found with id ${req.params.id}`, 404));
        }

        res.status(200).json({ success: true, data: {} });
    } catch (err) {
        logger.error(`Error deleting booking: ${err.message}`);
        next(new ErrorResponse('Unable to delete booking', 500));
    }
};
