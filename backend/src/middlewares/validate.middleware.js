//when user sends the request to routees then before passing to the controller
//req body is send to validate middleware .. which shows error if an  invallid req is comes
//of req is valiid then it goes to controlller.

const validate  =(schema)=>(req, res, next)=>{

    const {error}= schema.validate(req.body, {abortEarly: false});
    if(error){
        const messages = error.details?.map(d => d.message) || [error.message];
        return res.status(400).json({sucess:false, error: messages});
    }
    next();
}

module.exports = validate;