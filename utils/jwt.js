const jwt = require('jsonwebtoken')
const secretKey = process.env.JWTSECRETKEY
const expiresIn = process.env.JWTEXPIRY
const User = require("./../model/userModel")
const jwtConfig = {
    sign(_id){
        const token = jwt.sign({_id},secretKey, {expiresIn})
        return token
    },
  
    async verifyToken(req, res, next) {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) {
          return res.status(401).json({ message: 'No token provided' });
        }
    
        try {
          const decoded = jwt.verify(token,secretKey);

          const user = await User.findOne({_id:decoded._id})
          if (!user){
            return res.send({
              message:"Unauthorized invalid token provided",
              success:false
            })
          }
          req.user = user; // Add the decoded payload to the request object
          next();
        } catch (error) {
        console.log(res.success)
          return res.status(401).json({ message: 'Invalid token' ,  success:false});
        }
      }
}

module.exports = jwtConfig
