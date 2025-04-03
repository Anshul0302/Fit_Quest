const express = require("express");
const router = express.Router();
const TaskLog = require("../models/TaskLog");
const User = require("../models/User");
const { verifyToken } = require("../middleware/auth");
const sendNotification = require("../utils/sendNotification"); // ✅ Add this

// ✅ POST /api/task-log - Submit daily task proof
router.post("/", verifyToken, async (req, res) => { 
  const {
    challengeId,
    day,
    taskName,
    caloriesBurned,
    xpEarned,
    fqcEarned,
    proofImage,
  } = req.body;

  try {
    // 1. Save TaskLog
    const log = new TaskLog({
      user: req.user.id,
      challenge: challengeId,
      day,
      taskName,
      caloriesBurned,
      xpEarned,
      fqcEarned,
      proofImage,
    });
    await log.save();

    // 2. Update user XP and FQC
    const user = await User.findById(req.user.id);
    if (user) {
      user.xpCoins = (user.xpCoins || 0) + xpEarned;
      user.wallet.balance = (user.wallet.balance || 0) + fqcEarned;

      user.wallet.transactions.push({
        type: "reward",
        source: `Day ${day} - ${taskName}`,
        amount: fqcEarned,
        date: new Date(),
      });

      await user.save();
    }

    // 3. Send notification
    await sendNotification({
      userId: req.user.id,
      title: `🎉 Day ${day} Task Completed!`,
      message: `You earned ${xpEarned} XP and ${fqcEarned} FQC for completing '${taskName}'`,
      type: "task",
    });

    res.status(201).json({ msg: "Task logged successfully", log });
  } catch (err) {
    console.error("❌ TaskLog error:", err);
    res.status(500).json({ msg: "Server error" });
  }
});

router.get("/history/:challengeId", verifyToken, async (req, res) => {
    const challengeId = req.params.challengeId;
    const userId = req.user.id;
  
    console.log("🔍 Fetching task history for user:", userId, "Challenge:", challengeId);
  
    try {
      const logs = await TaskLog.find({
        user: userId,
        challenge: challengeId,
      }).sort({ day: 1 });
  
      res.json(logs);
    } catch (err) {
      console.error("❌ Error fetching task history:", err.message);
      res.status(500).json({ msg: "Server error" });
    }
  });
module.exports = router;
