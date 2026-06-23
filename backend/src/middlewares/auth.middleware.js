const jwt  =require('jsonwebtoken')
require('dotenv').config();
exports.verifyToken =(req, res, next)=>{

    const authheader=  req.headers.authorization;
    if(!authheader){
        return res.status(401).json({'message':'access denied'})
    }

    const token = authheader.split(' ')[1];

    try{
        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        )
        req.user = decoded;

        next();
    }
    catch(err){
        res.status(401).json({'message':'access denied'})
    }


}