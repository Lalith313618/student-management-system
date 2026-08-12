const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true,
        unique: true
    },

    name: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true
    },

    mobile: {
        type: String,
        required: true
    },

    gender: {
        type: String
    },

    department: {
        type: String,
        required: true
    },

    year: {
        type: String,
        required: true
    },

    dob: {
        type: String
    },

    status: {
        type: String,
        required: true
    },

    address: {
        type: String
    },

    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Student', studentSchema);
