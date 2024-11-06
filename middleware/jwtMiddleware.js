 const jwt = require('jsonwebtoken')

const jwtMiddleware = (req,res,next)=>{
    //logic
   console.log('inside jwtMiddleware');
    //access token
    const token = req.headers["authorization"].split(' ')[1]

    //verify
    try {
        const jwtResponse = jwt.verify(token,'secretKey')
        console.log(jwtResponse);
        req.payload= jwtResponse.userId
        next()

    } catch (error) {
        res.status(401).json('Authorization failed ... please login',error)
        
    }
}


module.exports= jwtMiddleware