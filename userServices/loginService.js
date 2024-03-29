const { loginSchema } = require("../JoiSchemas/JoiUserSchema");
const bcrypt = require("bcrypt-inzi");
const User = require("../model/userModel");
const jwtConfig = require("../utils/jwt");
const loginService = async(req, res)=>{
    try {
        // Validate the request body using the loginSchema
        const { error } = loginSchema.validate(req.body);
        if (error) {
          return res.status(400).json({ message: error.details[0].message });
        }
  
        const { email, password } = req.body;
  
        // Find the user by email
        const user = await User.findOne({ email }).select("-password");
  
        if (!user) {
          return res.status(400).json({ message: "Invalid email or password", success:false, user:{} });
        }
  
        // Compare the provided password with the stored hashed password
        const isPasswordValid = await bcrypt.varifyHash(password, user.password);
  
        if (!isPasswordValid) {
          return res.status(400).json({ message: "Wrong password", user:{}, success:false });
        }
        // Generate a JWT token and set it as a cookie
        const token = jwtConfig.sign(user._id);
        res.json({ token, success: true, user , message:"Login successfully!"});
      } catch (error) {
        return res
          .status(500)
          .json({ message: "Internal server error", error: error.message });
      }
}
module.exports= {loginService}