const mongoose = require('mongoose');
const crypto = require('crypto');
const bcrypt = require('bcryptjs');
const User = mongoose.Schema({
    fullName: String,
    password: {
        type: String,
        select: false
    },
    email: String,
    phone: String,
    address: String,
    childrenIds:[String]
}, { collection: 'users' });

User.pre('save', async function (next) {
    // Only run this function if password was actually modified
    if (!this.isModified('password')) return next();
    // Hash the password with cost of 12
    this.password = await bcrypt.hash(this.password, 12);
    next();
});

User.methods.correctPassword = async function (candidatePw, userPw) {
    return await bcrypt.compare(candidatePw, userPw)
}
module.exports = mongoose.model('User', User);