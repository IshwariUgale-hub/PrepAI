const mongoose =require('mongoose');

const connectDB = async ()=>{
    try{
        await mongoose.connect(process.env.MONGODB_SERVER);
        console.log('MongoDB Connected!');
    }
    catch(error){
        console.error(error);
        process.exit(1);
    }
}

module.exports =connectDB;