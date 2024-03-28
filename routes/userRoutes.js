const authController = require('../controller/userController');
const jwt = require("./../utils/jwt");
const express = require("express")
const {verifyToken} = jwt;
const userRouter = express.Router()
userRouter.post('/signup',authController.signup)
userRouter.post('/login',authController.login)
userRouter.get('/get-logged-in-user',verifyToken,authController.getLoggedInUser)



module.exports = userRouter;
