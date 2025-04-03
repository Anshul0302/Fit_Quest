const express = require("express");
const router = express.Router();
const SubscriptionPlan = require("../models/SubscriptionPlan");
const { verifyToken } = require("../middleware/auth");
const { isAdmin } = require("../middleware/adminCheck");
const User = require("../models/User");
const sendNotification = require("../utils/sendNotification");

// ✅ GET /api/subscription - Get all plans
router.get("/all", async (req, res) => {
  try {
    const plans = await SubscriptionPlan.find();
    res.json(plans);
  } catch (err) {
    console.error("❌ Get plans error:", err);
    res.status(500).json({ msg: "Server error" });
  }
});
router.post("/subscription", verifyToken, async (req, res) => {
  const { plan } = req.body;
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ msg: "User not found" });

    user.subscription = plan;
    await user.save();

    // 🔔 Notify user
    await sendNotification({
      userId: user._id,
      title: "Subscription Updated",
      message: `Your subscription plan has been updated to '${plan}'. Enjoy premium benefits!`,
      type: "subscription",
    });

    res.json({ msg: "Subscription updated", subscription: plan });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// ✅ POST /api/subscription - Create a new plan (admin only)
router.post("/create-plan", verifyToken, isAdmin, async (req, res) => {
  try {
    const { name, description, price, durationInDays, features } = req.body;
    const plan = new SubscriptionPlan({
      name,
      description,
      price,
      durationInDays,
      features,
    });
    await plan.save();
    res.status(201).json({ msg: "Plan created", plan });
  } catch (err) {
    console.error("❌ Create plan error:", err);
    res.status(500).json({ msg: "Server error" });
  }
});

// ✅ PUT /api/subscription/:id - Update plan (admin only)
router.put("/:id", verifyToken,  async (req, res) => {
  try {
    const updated = await SubscriptionPlan.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updated) return res.status(404).json({ msg: "Plan not found" });
    res.json({ msg: "Plan updated", plan: updated });
  } catch (err) {
    console.error("❌ Update plan error:", err);
    res.status(500).json({ msg: "Server error" });
  }
});

// ✅ DELETE /api/subscription/:id - Delete plan (admin only)
router.delete("/:id", verifyToken, isAdmin, async (req, res) => {
  try {
    const deleted = await SubscriptionPlan.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ msg: "Plan not found" });
    res.json({ msg: "Plan deleted" });
  } catch (err) {
    console.error("❌ Delete plan error:", err);
    res.status(500).json({ msg: "Server error" });
  }
});

module.exports = router;
