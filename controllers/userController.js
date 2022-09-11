const User = require('../models/user');
const jwt = require('jsonwebtoken');
const signToken = id => jwt.sign(
    { id },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRATION } 
);

const createSendToken = (user, statusCode, res) => {
    const token = signToken(user._id);
    // Remove password from output
    user.password = undefined;
    res.status(statusCode).json({
        status: 'success',
        token,
        user
    });
};

exports.signup =async(req, res, next) => {
    const {fullName, password, email,phone,address} = req.body
    const user = await User.create({
        fullName: fullName,
        email: email,
        password: password,
        phone: phone,
        address: address,
        childrenIds:[]
    });
    createSendToken(user, 201, res);
};

exports.login =async(req, res, next) => {
    const { email, password } = req.body;
    const user = await User.findOne({email}).select('+password');
    if (!user || !(await user.correctPassword(password, user.password))) return next(new AppError(`Incorrect login credentials.`, 401));
    await user.save();
    createSendToken(user, 200, res);
}