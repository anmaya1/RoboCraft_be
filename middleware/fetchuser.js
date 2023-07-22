var jwt = require('jsonwebtoken');

const JWT_SECRET="Anmaya$Tech";

const fetchuser = (req,res,next)=>{
    const token =req.header('auth-token');
    if(!token){
    res.status(401).send({error: "Please autenticate using token"})
    }
    try {
        const data=jwt.verify(token,JWT_SECRET);
        req.admin=data.admin;
        next();
    } catch (error) {
        res.status(401).send({error:"please authenticate using valid token"})
    }
}
module.exports = fetchuser;