const jwt = require('jsonwebtoken')

const protectt = (req,res,next) =>{
    let token = req.headers.authorization;

    if(token && token.startsWith('Bearer')){
        token = token.split(' ')[1]

        try{
            const decoded = jwt.verify(token , process.env.JWT_SECRET)
            req.user = {id: decoded.id, username: decoded.username}
            console.log(req.user)
            next();
        }catch(error){
            return res.status(401).json({message: 'Unauthorized, token failed'})
        }
    }else{
        return res.status(401).json({message: 'No token provided'})
    }
}

module.exports =  protectt 