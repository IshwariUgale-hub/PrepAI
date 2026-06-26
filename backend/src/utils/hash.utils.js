//for hashing password and and  bcrypt hash/compare helpers

const bcrypt = require('bcrypt');

const hashPassword =(password)=>{
    return bcrypt.hash(password, 10);
}

const comparePassword =(password , hashpass)=>{
    return bcrypt.compare(password, hashpass );
}

module.exports={hashPassword, comparePassword}