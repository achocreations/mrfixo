const mongoose = require('mongoose');

const ServiceSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add a service name']
    },
    category: {
        type: String,
        required: [true, 'Please add a category']
    },
    description: {
        type: String
    },
    price: {
        type: Number,
        required: [true, 'Please add a price']
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    },
    rating: { 
        type: Number, 
        default: 0 
    }
}, { timestamps: true });

module.exports = mongoose.model('Service', ServiceSchema);
