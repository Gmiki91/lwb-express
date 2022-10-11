module.exports = async (req, res, next) => {
    if (req.body.user.type === '0')
        return res.status(401).json({ message: 'Not authorized' });
    next();
};