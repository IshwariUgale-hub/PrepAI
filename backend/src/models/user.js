//user schema means the information user need for auth.

const mongoose  =require("mongoose");

const userSchema = new mongoose.Schema({
    name:{type:String ,required: true},
    email: {type:String  , required:true ,unique:true},
    password: {type:String , required:true},
    avatar: {type:String},
    role:{type:String , enum:['user','admin'],default:'user'},
    isVerified: {type:Boolean , default: false},
    subscription: {type:String, enum:['free','pro'], default:'free'},
    verifyToken:{type:String},
    resetToken:{type:String},


}, {timestamps:true});

module.exports = mongoose.model('User',userSchema);