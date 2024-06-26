const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const tokenSchema = new Schema({
    token: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    isValid: {
        type: Boolean,
        required: true,
        default: true
    }
}, {
    timestamps: true
});

const Token = mongoose.model('Token', tokenSchema);

module.exports = Token;
