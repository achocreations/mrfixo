const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { ErrorResponse } = require('../utils/errorHandler');
const logger = require('../utils/logger');

// @desc    Register user
// @route   POST /api/users/register
// @access  Public
exports.registerUser = async (req, res, next) => {
    const { name, email, password, role } = req.body;
    try {
        const user = await User.findOne({ email });
        if (user) return res.status(400).json({ msg: 'User already exists' });

        user = await User.create({
            name,
            email,
            password,
            role
        });

        res.status(201).json({
            success: true,
            data: user
        });

        logger.info(`User registered with email: ${email}`);
    } catch (err) {
        logger.error(`Error creating user: ${err.message}`);
        next(new ErrorResponse('Unable to create user', 500));
    }
};

// @desc    Login user
// @route   GET /api/users/:id
// @access  Public
exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ msg: 'Invalid credentials' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials' });

        const payload = { user: { id: user.id, userType: user.userType } };
        jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '5h' }, (err, token) => {
            if (err) throw err;
            res.json({ token });
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server error');
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

// @desc    Get single user
// @route   GET /api/users/:id
// @access  Private/Admin
exports.getUser = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id);

        if (!user) {
            return next(new ErrorResponse(`User not found with id of ${req.params.id}`, 404));
        }

        res.status(200).json({
            success: true,
            data: user
        });

        logger.info(`Retrieved user with id: ${req.params.id}`);
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
