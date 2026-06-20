// controller is just a middlemam who take request and give that req to serives and they perfrom the task and return result to
// controller and then controller send res to the client.

const authservice = require('../services/authservice'); //main business logic on authservice.js


exports.register=  async (req, res)=>{
    try{
       const result = await authservice.register(req.body);
       res.status(200).json(result);   // 200 server has successfully processed a request
    }
    catch(e){
        res.status(400).json({'message': e.message});  //400 client side error like syntax and all
    }
};


exports.login = async (req, res) =>{
    try{
        const result = await authservice.login(req.body);
        res.status(200).json(result);    //200 OK successfully process
    }
    catch(e){
        res.status(401).json({'message': e.message});  //401 Unauthorized status code
    }
};


exports.logout = (req, res)=>{
    res.status(200).json({'message': 'Logged out Successfully'});
};


//forgetpassword generates the token  for user who wants to reset pass and that token sends to an rsetpassword
exports.forgotPassword = async (req, res)=>{
    try{
        const result = await authservice.forgotPassword(req.body.email);
        res.status(200).json(result);
    }
    catch(e){
        res.status(400).json({'message': e.message});
    }
};

exports.resetPassword = async (req,  res )=>{
    try{
          const result  = await authservice.resetPassword( req.params.token, req.body.password);
          res.status(200).json(result);
    }
    catch(e){
        res.status(400).json({'message': e.message});
    }
}


exports.verifyEmail = async (req, res)=>{
    try{
        const result = await authservice.verifyEmail(req.params.token);
        res.status(200).json(result);
    }
    catch(e){
        res.status(400).json({'message': e.message});
    }
};
