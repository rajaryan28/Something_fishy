const jwt = require('jsonwebtoken');
const JWT_SECRET = 'raj_of_priyadarshini'

const fetchuser =  (req,res,next)=>{

    //get the user from the jwt token and add id to req 
    const token = req.header('auth-token')
    if(!token){
        res.status(401).send({error:"Please authenticate youself!"})
    }
    try {
        const data =  jwt.verify(token,JWT_SECRET)
        req.user = data;
        next()
    } catch (error) {
        res.status(401).send({error:"Please authenticate youself!"})
    }
    
}


module.exports= fetchuser

