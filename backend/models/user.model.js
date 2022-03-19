const mongoose = require("mongoose");
const User = mongoose.model(
  "User",
  new mongoose.Schema({
    username: String,
    firstname:String,
    lastname:String,
    phone: String,
    email: String,
    password: String,
    location: String
  })
);
module.exports = User;