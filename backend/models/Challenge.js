// models/Challenge.js
const mongoose = require("mongoose");

const ChallengeSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  duration: { type: Number, required: true }, // days
  xpReward: { type: Number, required: true },
  difficulty: {
    type: String,
    enum: ["easy", "medium", "hard"],
    required: true,
  },
  startDate: { type: Date },
  status: {
    type: String,
    enum: ["active", "completed", "left"],
    default: "active",
  },
  participants: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  dailyTasks: [{ type: String }],
  leaderboard: [
    {
      userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      rank: Number,
      xp: Number,
    },
  ],
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Challenge", ChallengeSchema);
