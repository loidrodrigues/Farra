const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  passwordHash: {
    type: String,
    required: true,
  },
  isOrganizer: {
    type: Boolean,
    default: false,
  },
  organizationName: {
    type: String,
    required: false,
    trim: true,
  },
  bankAccount: {
    type: String,
    required: false,
    trim: true,
  },
  nif: {
    type: String,
    required: false,
    trim: true,
  },
  resetToken: {
    type: String,
    required: false,
  },
  resetTokenExpiry: {
    type: Date,
    required: false,
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
