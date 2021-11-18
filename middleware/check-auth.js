const jwt=require("jsonwebtoken");
module.exports=(req,res,next)=>{
    try{
// console.log("authorization",req.headers.authorization);
        // const token=req.headers.authorization.split("")[1];
        const token=req.headers.authorization;
        // console.log("token",token);
      let decodedToken=  jwt.verify(token,"dinga");
      req.userData={email:decodedToken,userId:decodedToken.userId},
    //   console.log("pppp",decodedToken);
        next();
    }catch(err){
        // console.log("err",err);
        res.status(401).json({message:"You are not authenticated"});
    }
    
}