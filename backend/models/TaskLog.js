const mongoose = require("mongoose");

const TaskLogSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  challenge: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Challenge",
    required: true,
  },
  day: { type: Number, required: true },
  taskName: { type: String, required: true },
  caloriesBurned: { type: Number, default: 0 },
  xpEarned: { type: Number, default: 0 },
  fqcEarned: { type: Number, default: 0 },
  proofImage: { type: String },
  completedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("TaskLog", TaskLogSchema);
