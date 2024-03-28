const { loginService } = require("../userServices/loginService");
const { signUpService } = require("../userServices/signUpService");
const getLoggedInUserService = require("../userServices/getLoggedInUserService");

const authController = {
  async signup(req, res) {
   await signUpService(req, res)
  },

  async login(req, res) {
      await loginService(req, res)
  },
  async getLoggedInUser(req, res){
      await getLoggedInUserService(req, res) 
  },
};
module.exports = authController;
