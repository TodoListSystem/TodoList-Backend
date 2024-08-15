const mongoose = require("mongoose");
const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    userName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: /.+@.+/,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);
const userModel = mongoose.model("Users", userSchema);
module.exports = userModel;
