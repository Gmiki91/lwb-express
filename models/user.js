const mongoose = require('mongoose');
const crypto = require('crypto');
const bcrypt = require('bcryptjs');
const User = mongoose.Schema({
    password: {
        type: String,
        select: false
    },
    email: String,
    childrenIds: [String],
    type:String
}, { collection: 'users' });

User.pre('save', function (next) {
    var user = this;

    // only hash the password if it has been modified (or is new)
    if (!user.isModified('password')) return next();

    // generate a salt
    bcrypt.genSalt(10, function (err, salt) {
        if (err) return next(err);

        // hash the password using our new salt
        bcrypt.hash(user.password, salt, function (err, hash) {
            if (err) return next(err);

            // override the cleartext password with the hashed one
            user.password = hash;
            next();
        });
    });
});

User.methods.comparePassword = async function (candidatePw, userPw) {
    return await bcrypt.compare(candidatePw, userPw)
};
module.exports = mongoose.model('User', User);