const mongoose = require("mongoose");

const AdminSchema = new mongoose.Schema({
  name: { type: String, required: true },
  username: { type: String, required: true, unique: false },
  email: { type: String, required: true, unique: false },
  password: { type: String, required: true },
  role: { type: String, default: "admin" },
  isVerified: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
  resetToken: { type: String },
  otp: { type: String },
  otpExpiry: { type: Date },
});

module.exports = mongoose.model("Admin", AdminSchema);
