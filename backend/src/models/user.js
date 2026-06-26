//user schema means the information user need for auth.

const mongoose  =require("mongoose");

const userSchema = new mongoose.Schema({
    name:{type:String ,required: true},
    email: {type:String  , required:true ,unique:true},
    password: {type:String , required:true},
    avatar: {type:String},
    role:{type:String , enum:['user','admin'],default:'user'},
    isEmailVerified: {type:Boolean , default: false},
    subscription: {type:String, enum:['free','pro'], default:'free'},
    EmailVerifyToken:{type:String, default:null},
    passwordResetToken: {
        type: String,
        default: null
    },
    passwordResetExpires: {
        type: Date,
        default: null
    }

}, {timestamps:true});

module.exports = mongoose.model('User',userSchema);