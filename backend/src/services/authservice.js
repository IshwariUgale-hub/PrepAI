//authservice is the main logic behind the task that user need to perform ...the req is coming from the controller

const user = require('./models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.register = async ({name, email,password})=>{

    const existemail = await user.findone('email'); //is in database  email is exist it will return that email otherwisse it will return null

    if(existemail){
        throw error('user already exists');
    }

    //making hash password from original password
    const hashedpassword =  await bcrypt.hash(password, 10);

    //creating user in DB
    const user = user.create({
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


