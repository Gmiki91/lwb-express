const jwt = require('jsonwebtoken');
const User = require('../models/user')
module.exports = async(req, res, next)=> {
   let token;

    if( req.headers.authorization &&  req.headers.authorization.startsWith('Bearer')){
        token = req.headers.authorization.split(" ")[1];
    }

    if(!token){
       console.log('You must be logged in to get access!', 401);
    }

    const decoded = jwt.verify(token,process.env.JWT_SECRET);

    const user = await User.findById(decoded.id);
    if(!user){
        console.log('User does not exists!', 401);
    }
    
    req.body.user = user;
    next();
};