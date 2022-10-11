module.exports = async (req, res, next) => {
    if (req.body.user.type === '1')
        return res.status(401).json({ message: 'Not authorized' });
    next();
};