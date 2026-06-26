const mongoose =require('mongoose');
const {MONGODB_SERVER}= require('./env');

const connectDB = async ()=>{
    try{
        await mongoose.connect(MONGODB_SERVER);
        console.log('MongoDB Connected!');
    }
    catch(error){
        console.error(error);
        process.exit(1);
    }
}

module.exports =connectDB;