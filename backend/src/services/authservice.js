//authservice is the main logic behind the task that user need to perform ...the req is coming from the controller

const model = require('../models/user');
const {generateToken}= require('../utils/jwt.utils');
const { hashPassword, comparePassword } = require('../utils/hash.utils');
const {generateRandomToken}= require('../utils/jwt.utils');
const {Model} = require("mongoose");

//register task
exports.register = async ({name, email,password})=>{

    const existemail = await model.findOne({email}); //is in database  email is exist it will return that email otherwisse it will return null

    if(existemail){
        throw new Error('user already exists');
    }

    //making hash password from original password
    const hashedpassword = await hashPassword(password);
    // const hashedpassword =  await bcrypt.hash(password, 10);

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

     const ismatch = comparePassword(password, user.password);
    //const ismatch = await bcrypt.compare(password,user.password)

    if(!ismatch ){
        throw new Error("Invallid password");

    }

    //create jwt token for user login
    const token =generateToken(user._id);
    //
    // const token = jwt.sign(
    //     {userid: user._id},
    //     process.env.JWT_SECRET,
    //     {expiresIn: process.env.JWT_EXPIRES_IN}
    // );

    return{
        status:'success',
        token:token,
        message:"Login successfully"
    }
}


//processsing
// logout task
exports.forgotPassword = async (email) => {

    const user= await model.findOne({email});
    if(!user){
        throw new Error("this email id not exist");
    }

    const resetToken =generateRandomToken();
    user.passwordResetToken =resetToken;
    user.passwordResetExpires= new Date(Date.now()+ 15*60*1000) //15 min expiry
    await user.save();

    console.log(`[DEV] Reset token for ${email}: ${resetToken}`);

    return {
        message: "If this email exists, a reset link has been sent.",
        dev_token: resetToken  // ← remove this in production!
    };
};



exports.resetPassword = async (token, newPassword) => {
    // 1. Find user with this token AND token not expired
    const user = await model.findOne({
        passwordResetToken: token,
        passwordResetExpires: { $gt: new Date() }  // token must not be expired
    });

    if (!user) {
        throw new Error("Invalid or expired reset token");
    }

    // 2. Hash new password and save
    user.password = await hashPassword(newPassword);
    // 3. Clear the reset token (one-time use)
    user.passwordResetToken = null;
    user.passwordResetExpires = null;
    await user.save();

    return { message: "Password reset successful" };

};


exports.verifyEmail = async (token) => {
    const user = await model.findOne({ EmailVerifyToken: token});
    if (!user) {
        throw new Error("Invalid or expired verification token");
    }

    if (user.isEmailVerified) {
        return { message: "Email already verified" };
    }

    user.isEmailVerified =true;
    user.emailVerifyToken = null;
    await user.save();

    return { message: "Email verified successfully" };
};
