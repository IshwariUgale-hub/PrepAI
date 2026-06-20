//authservice is the main logic behind the task that user need to perform ...the req is coming from the controller

const model = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

//register task
exports.register = async ({name, email,password})=>{

    const existemail = await model.findOne({email}); //is in database  email is exist it will return that email otherwisse it will return null

    if(existemail){
        throw new Error('user already exists');
    }

    //making hash password from original password
    const hashedpassword =  await bcrypt.hash(password, 10);

    //creating user in DB
    const user = await model.create({
        name,
        email,
        password:hashedpassword
    });

    return{
        status: "success",
        message: "User registered successfully",
        user :{
            id: user._id,
            name: user.name,
            email: user.email
        }
    }

};

//login task

exports.login  = async ({email, password})=>{

    const user = await model.findOne({email});
    if(!user){
        throw new Error("Invallid Email id");
    }

    //matching password of user of the requested email id user

    const ismatch = await bcrypt.compare(password,user.password)

    if(!ismatch){
        throw new Error("Invallid password");

    }

    //create jwt token for user login

    const token = jwt.sign(
        {userid: user._id},
        process.env.JWT_SECRET,
        {expiresIn:'3d'}
    );

    return{
        satus:'success',
        token:token,
        message:"Login successfully"
    }
}


//processsing
// logout task
exports.forgotPassword = async (email) => {
    return {
        message: "Reset password link sent"
    };
};

exports.resetPassword = async (token, password) => {
    return {
        message: "Password reset successful"
    };
};

exports.verifyEmail = async (token) => {
    return {
        message: "Email verified successfully"
    };
};
