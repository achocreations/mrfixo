// /backend/controllers/availabilityController.js
const Availability = require('../models/Availability');
const logger = require('../utils/logger');
const { ErrorResponse } = require('../utils/errorHandler');

// Create or Update Availability
exports.setAvailability = async (req, res) => {
  try {
    const { providerId, date, slots } = req.body;

    let availability = await Availability.findOne({ providerId, date });

    if (availability) {
      availability.slots = slots;
      availability.updatedAt = Date.now();
    } else {
      availability = new Availability({
        providerId,
        date,
        slots
      });
    }

    await availability.save();
    logger.info(`Availability set for provider ${providerId} on ${date}`);

    res.status(200).json({
      success: true,
      message: 'Availability updated successfully',
      availability
    });
  } catch (error) {
    logger.error(`Error setting availability: ${error.message}`);
    next(new ErrorResponse(`Error setting availability: ${error.message}`, 500));
  }
};

// Get Availability by Provider and Date
exports.getAvailability = async (req, res) => {
  try {
    const { providerId, date } = req.params;

    const availability = await Availability.findOne({ providerId, date });

    if (!availability) {
      logger.warn(`No availability found for provider ${providerId} on ${date}`);
      return res.status(404).json({
        success: false,
        message: 'No availability found'
      });
    }

    logger.info(`Retrieved availability for provider ${providerId} on ${date}`);
    res.status(200).json({
      success: true,
      availability
    });
  } catch (error) {
    logger.error(`Error retrieving availability: ${error.message}`);
    next(new ErrorResponse(`Error retrieving availability: ${error.message}`, 500));
  }
};
