// models/User.js (snippet)
const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema({
  name: { type: String },
  email: { type: String, required: true, unique: true },
  password: { type: String },
  // Google users ke liye optional
  role: {
    type: String,
    default: "user", // 👈 optional
    enum: ["user", "admin"],
  },
  googleId: { type: String },
  age: { type: Number },
  gender: { type: String },
  weight: { type: Number },
  height: { type: Number },
  goal: { type: String, enum: ["muscle gain", "weight loss", "endurance"] },
  profilePicture: { type: String },
  xpCoins: { type: Number, default: 0 },
  challengesJoined: [
    { type: mongoose.Schema.Types.ObjectId, ref: "Challenge" },
  ],
  wallet: {
    balance: { type: Number, default: 0 },
    transactions: [{ type: Object }],
  },
  subscription: {
    type: String,
    enum: ["basic", "premium", "elite"],
    default: "basic",
  },
  // OTP fields for email verification
  otp: { type: String },
  otpExpiry: { type: Date },
  deviceToken: { type: String },
  isVerified: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});
module.exports = mongoose.model("User", UserSchema);
