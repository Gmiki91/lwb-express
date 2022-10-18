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
        type: user.type
    });
};

exports.signup = async (req, res, next) => {
    const { password, email, type } = req.body;
    const user = await User.create({
        email: email,
        password: password,
        type: type,
        childrenIds: []
    });
    createSendToken(user, 201, res);
};

exports.login = async (req, res, next) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email }).select('+password');
    if (!user || !(await user.comparePassword(password, user.password)))
        return res.status(401).json({ status: "error", message: "Wrong email or password" });
    createSendToken(user, 200, res);
}