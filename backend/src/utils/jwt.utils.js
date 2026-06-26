//helper function for jwt .
//generate token and verify token

const jwt = require('jsonwebtoken');

const  {JWT_SECRET, JWT_EXPIRES_IN }= require('../config/env');

const generateToken  =(userID)=>{
    return jwt.sign({_id:userID}, JWT_SECRET, {expiresIn: JWT_EXPIRES_IN});
}

const verifyToken =(token)=>{
    return jwt.verify(token , JWT_SECRET);
};

module.exports={generateToken, verifyToken};