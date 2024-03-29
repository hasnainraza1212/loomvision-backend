const jwt = require("jsonwebtoken");
const User = require("../model/userModel");
const redis = require("../db/redis");

const getLoggedInUserService = async (req, res) => {
  try {
    const id = req.user._id;
    let cachedValue =await redis.get(id)
    if(cachedValue){
      console.log("cached")
      cachedValue = JSON.parse(cachedValue)
      return res
          .status(200)
          .send({ message: "user fetched successfully!", user:cachedValue, success: true });
    }
    console.log("db")
    const user = await User.findOne({ _id: id }).select("-password");
    if (!user) {
      return res.status(404).send({
        message: "user not  found!",
        user: {},
        success: false,
      });
    }
  await  redis.set(id, JSON.stringify(user))
    return res
      .status(200)
      .send({ message: "user fetched successfully!", user, success: true });
  } catch (error) {
    res.status(500).send({ message: error });
  }
};
module.exports = getLoggedInUserService;
