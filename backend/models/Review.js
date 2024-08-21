const mongoose = require('mongoose');

const ReviewSchema = new mongoose.Schema({
    rating: {
        type: Number,
        required: [true, 'Please add a rating between 1 and 5'],
        min: 1,
        max: 5
    },
    comment: {
        type: String,
        required: [true, 'Please add a comment']
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    },
    service: {
        type: mongoose.Schema.ObjectId,
        ref: 'Service',
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model('Review', ReviewSchema);
