const jwt = require('jsonwebtoken');

const secretkey = "SportsSelectSecret"; 

module.exports =(req,res,next)=>{
    try{
     const token = req.headers.authorization.split(' ')[1];
     const decode = jwt.verify(token, "SportsSelectSecret");
     req.userData = decode;
     
     next();}
     catch(err){
        res.json({success:false, message: "Authorization not Successful"})
     }

}
