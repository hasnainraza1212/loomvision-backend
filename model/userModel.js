const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: false },
},
{
  timestamps:true
}
);
const User = mongoose.model("TestDb", UserSchema);
module.exports = User
