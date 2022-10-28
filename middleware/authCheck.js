const jwt = require('jsonwebtoken');
const User = require('../models/user');
module.exports = async(req, res, next)=> {
   let token;

    if( req.headers.authorization &&  req.headers.authorization.startsWith('Bearer')){
        token = req.headers.authorization.split(" ")[1];
    }

    if(!token){
       return res.status(401).json({message:'You must be logged in to get access!'});
    }

    const decoded = jwt.verify(token,process.env.JWT_SECRET);

    const user = await User.findById(decoded.id);
    if(!user){
        console.log('User does not exists!', 401);
        return res.status(401).json({message:'User does not exists'});
    }
    
    req.body.user = user;
    next();
};