const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true
  },
  creator: {
    type: String,
  },
  private: {
    type: Boolean,
  },
  access:[],
  
});

module.exports = Folder = mongoose.model("folder", UserSchema);
