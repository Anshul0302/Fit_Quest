const mongoose = require("mongoose");

const ReferralSchema = new mongoose.Schema({
  referrer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  referee: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  referralCode: { type: String, required: true, unique: true },
  used: { type: Boolean, default: false },
  rewardGranted: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Referral", ReferralSchema);
