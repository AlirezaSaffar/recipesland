const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true],
  },
  password: {
    type: String,
    required: [true],
  },
  favorites: { type: String, default: "" },
});

module.exports = mongoose.model("user", userSchema);
