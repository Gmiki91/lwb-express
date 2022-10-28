const jwt = require('jsonwebtoken');
const Student = require('../models/student');
module.exports = async (req, res, next) => {
    let token;
    if( req.headers.authorization &&  req.headers.authorization.startsWith('Bearer')){
        token = req.headers.authorization.split(" ")[1];
    }

    if(!token){
       return res.status(401).json({message:'You must be logged in to get access!'});
    }

    const decoded = jwt.verify(token,process.env.JWT_SECRET);
    const user = await Student.findById(decoded.id);
   
    req.body.user = user;
    next();
};