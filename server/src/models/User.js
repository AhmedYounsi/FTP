const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    avatar: {
        type: String
    },

    date: {
        type: Date,
        default: Date.now()
    },
    lastName: {
        type: String,
    },
    tel: {
        type: String,
        required: true
    },
    address: {
        type: String
    },
    DateOfBirth: {
        type: Date,
    },

    office: {
        type: String,
        required: true
    },
    departement: {
        type: String,
        required: true
    },
    post: {
        type: String,
        required: true
    },
    reportsTo: {
        type: String,
    },

    typeContrat: {
        type: String,
        required: true
    },

    from: {
        type: Date,
    }


})

module.exports = User = mongoose.model('user', UserSchema);