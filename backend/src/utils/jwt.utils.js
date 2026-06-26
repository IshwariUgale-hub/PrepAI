//helper function for jwt .
//generate token and verify token

const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const {RESET_TOKEN_SECRET}=require('../config/env');

const  {JWT_SECRET, JWT_EXPIRES_IN }= require('../config/env');

const generateToken  =(userID)=>{
    return jwt.sign({_id:userID}, JWT_SECRET, {expiresIn: JWT_EXPIRES_IN});
}

const verifyToken =(token)=>{
    return jwt.verify(token , JWT_SECRET);
};

// Generate a secure random token (for email/reset — NOT a JWT)
const generateRandomToken = () => {
    return crypto.randomBytes(32).toString('hex');
};

// Optional: generate a short-lived JWT for reset (alternative approach)
const generateResetToken = (userId) => {
    return jwt.sign({ id: userId }, RESET_TOKEN_SECRET, {
        expiresIn: '15m'
    });
};

module.exports={generateToken, verifyToken,generateRandomToken,generateResetToken};