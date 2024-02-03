const mongoose = require('mongoose');

const changePasswordSchema = new mongoose.Schema({
    username: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    currentPassword: {
        type: String,
        required: true
    },
    newPassword: {
        type: String,
        required: true
    }
});

const ChangePassword = mongoose.model('ChangePassword', changePasswordSchema);

module.exports = ChangePassword;
