const jwt = require('jsonwebtoken');
const { MESSAGE_401 } = require('../commons');
const TOKEN_SECRET = process.env.TOKEN_SECRET;

module.exports = 
function(req,res,next){
    const token = req.header('authorization-token');
    if(!token) return res.status(401).json({message:`${MESSAGE_401}`});
    try{
        const userVerified = jwt.verify(token, TOKEN_SECRET);
        req.user = userVerified;
        next();
    }
    catch(err){
        res.status(401).json({message: `${MESSAGE_401}`});
    }
}