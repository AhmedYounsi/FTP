const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  path: {
    type: String,
  },
  folder: {
    type: String,
  },
  size: {
    type: String,
  },
  ext: {
    type: String,
  },
  user: [],
  user_id: {
    type: String,
  }, 
  date: {
    type: Date,
  },
  timestamp:{
    type: String,
    default: new Date().getTime()
  }
});

module.exports = File = mongoose.model("file", UserSchema);
