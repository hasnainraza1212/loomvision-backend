const jwt = require("jsonwebtoken");
const User = require("../model/userModel");

const getLoggedInUserService = async (req, res) => {
  try {
    const id = req.user._id
    const user =await User.findOne({ _id: id }).select("-password");
    if (!user) {
      return res
        .status(404)
        .send({
          message:
            "user not  found!",
        });
    }
    return res.status(200).send({ message: "user fetched successfully!", user, success:true});
  } catch (error) {
    res.status(500).send({ message: error });
  }
};
module.exports = getLoggedInUserService;
