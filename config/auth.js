require('dotenv').config();
const jwt = require('jsonwebtoken');

module.exports.checkAuth = async (req,res,next) =>{
        let authHeader = req.headers['authorization'];
        if(authHeader){
            let token = authHeader && authHeader.split(' ')[1];
            let user = await jwt.verify(token,process.env.SECRET_KEY);
            req.user = user;
        }
        next();
}


