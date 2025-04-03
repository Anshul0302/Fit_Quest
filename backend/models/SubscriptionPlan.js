const mongoose = require("mongoose");

const SubscriptionPlanSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  description: String,
  price: { type: Number, required: true },
  durationInDays: { type: Number, required: true },
  features: [{ type: String }],
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("SubscriptionPlan", SubscriptionPlanSchema);
