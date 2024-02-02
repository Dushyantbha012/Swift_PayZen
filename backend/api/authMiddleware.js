const { JWT_SECRET}= require("../config")
const jwt = require("jsonwebtoken");

const authMiddleware = (req,res,next)=>{
   
    const authHeader = req.headers.authorisation;
    if(!authHeader){
        console.log("auth failed 1")
        return res.status(403).json({meassage:"error here"});
    }
    try {
        
        const decoded = jwt.verify(authHeader, JWT_SECRET);

        req.userId = decoded.userId;
        console.log("authorisation done")
        next();
    } catch (err) {
        console.log("auth failed 2")
        return res.status(403).json({message:"authentication error"});
    }
}
module.exports = {
    authMiddleware
}
