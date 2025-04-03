const express = require("express");
const router = express.Router();
const Referral = require("../models/Referral");
const User = require("../models/User");
const { verifyToken } = require("../middleware/auth");
const crypto = require("crypto");
const sendNotification = require("../utils/sendNotification");

// ✅ POST /api/referral/generate - Generate a referral code for current user
router.post("/generate", verifyToken, async (req, res) => {
  try {
    const code = crypto.randomBytes(5).toString("hex");
    const referral = new Referral({
      referrer: req.user.id,
      referralCode: code,
    });
    await referral.save();
    res.json({ msg: "Referral code generated", referral });
  } catch (err) {
    console.error("❌ Generate code error:", err);
    res.status(500).json({ msg: "Server error" });
  }
});

// ✅ POST /api/referral/use/:code - Use a referral code
router.post("/use/:code", verifyToken, async (req, res) => {
  try {
    const referral = await Referral.findOne({ referralCode: req.params.code });
    if (!referral || referral.used) {
      return res.status(400).json({ msg: "Invalid or already used code" });
    }

    // Prevent self-referral
    if (referral.referrer.toString() === req.user.id) {
      return res
        .status(400)
        .json({ msg: "You cannot use your own referral code." });
    }

    referral.referee = req.user.id;
    referral.used = true;

    const referrer = await User.findById(referral.referrer);
    const referee = await User.findById(req.user.id);

    if (referrer && referee) {
      const rewardXP = 100;
      const rewardFQC = 50;

      // Reward referrer
      referrer.xpCoins += rewardXP;
      referrer.wallet.balance += rewardFQC;
      referrer.wallet.transactions.push({
        type: "referral",
        source: `Referral bonus for code ${referral.referralCode}`,
        amount: rewardFQC,
        date: new Date(),
      });

      // Reward referee
      referee.xpCoins += rewardXP / 2;
      referee.wallet.balance += rewardFQC / 2;
      referee.wallet.transactions.push({
        type: "referral",
        source: "Welcome bonus for using referral",
        amount: rewardFQC / 2,
        date: new Date(),
      });

      await referrer.save();
      await referee.save();

      referral.rewardGranted = true;
      await referral.save();

      // Send notifications
      await sendNotification({
        userId: referrer._id,
        title: "🎁 Referral Bonus!",
        message: `You earned ${rewardXP} XP & ${rewardFQC} FQC for inviting a friend.`,
        type: "system",
      });

      await sendNotification({
        userId: referee._id,
        title: "🎉 Welcome Bonus!",
        message: `You earned ${rewardXP / 2} XP & ${
          rewardFQC / 2
        } FQC for using a referral.`,
        type: "system",
      });
    }

    res.json({ msg: "Referral code used successfully", referral });
  } catch (err) {
    console.error("❌ Use code error:", err);
    res.status(500).json({ msg: "Server error" });
  }
});

// ✅ GET /api/referral/my - See all referrals from current user
router.get("/my", verifyToken, async (req, res) => {
  try {
    const referrals = await Referral.find({ referrer: req.user.id }).populate(
      "referee"
    );
    res.json(referrals);
  } catch (err) {
    console.error("❌ My referrals error:", err);
    res.status(500).json({ msg: "Server error" });
  }
});

module.exports = router;
