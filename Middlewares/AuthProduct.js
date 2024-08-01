const jwt = require('jsonwebtoken')

const productAuth = (req, res, next)=>{
    const auth = req.headers['authorization']
    if (!auth){
        return res.status(403).json({message: 'UnAuthorized, jwy token required'})
    }
    try{
        const decoded = jwt.verify(auth, process.env.JWT_SECRET)
        req.user = decoded
        next()
    } catch(err){
        return res.status(401).json({message: 'Unauthorized, JWT token is wrong or expired'})
    }
}

module.exports = productAuth