const mongoose = require('mongoose');
const { hashPassword } = require('../helpers/bcrypt');

const adminSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
})

adminSchema.pre('save', function(next) {
    const user = this;
    // only hash the password if it has been modified (or is new)
    if (!user.isModified('password')) return next();

    user.password = hashPassword(user.password);
    
    next();
  });

module.exports = mongoose.model('Admin', adminSchema);