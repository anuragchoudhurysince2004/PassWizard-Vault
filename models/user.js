const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: {
      validate: true,
      message: "Username is required for registering a user",
    },
  },
  email: {
    type: String,
    required: [true, "username is required for creating a account"],
    unique: [true, "Another user is using the same email please try again"],
  },
  password: {
    type: String,
    required: [true, "password is required for creating a account"],
  },
  //confirm password logic in pending
});
module.exports = mongoose.model("user", userSchema);
