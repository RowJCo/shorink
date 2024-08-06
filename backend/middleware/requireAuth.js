const jwt = require('jsonwebtoken');
const User = require('../models/user');

const requireAuth = async(require, response, next) => {
    try{
    const token = require.cookies.Authorisation;
    if(!token){
        return response.sendStatus(401);
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if(Date.now() > decoded.expiration){
        return response.sendStatus(401);
    }
    const user = await User.findById(decoded.subject);
    if(!user){
        return response.sendStatus(401);
    }
    require.user = user;
    next();
    }catch(error){
        console.log(error);
        return response.sendStatus(401);
    }
}

module.exports = requireAuth;