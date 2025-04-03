// routes/user.js
const express = require("express");
const router = express.Router();
const { verifyToken } = require("../middleware/auth");
const { check, validationResult } = require("express-validator");

const User = require("../models/User");
const Challenge = require("../models/Challenge");
const sendNotification = require("../utils/sendNotification");
const { isAdmin } = require("../middleware/adminCheck");

// POST /api/user/profile - Profile Setup/Update
router.get(
  "/profile",
  verifyToken,
  [
    check("age", "Age must be a number").optional().isNumeric(),
    check("gender", "Gender is required").optional().notEmpty(),
    check("goal", "Goal must be one of muscle gain, weight loss, endurance")
      .optional()
      .isIn(["muscle gain", "weight loss", "endurance"]),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { age, gender, weight, height, goal, profilePicture, name } =
      req.body;
    try {
      const user = await User.findById(req.user.id).select("-password");
      if (!user) return res.status(404).json({ msg: res.__("user.not_found") });

      user.name = name || user.name;
      user.age = age;
      user.gender = gender;
      user.weight = weight;
      user.height = height;
      user.goal = goal;
      user.profilePicture = profilePicture;
      await user.save();
      res.json({ msg: res.__("user.profile_updated"), user });
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ msg: res.__("user.server_error") });
    }
  }
);

// GET /api/user/dashboard - Dashboard Data
router.get("/dashboard", verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate("challengesJoined");
    res.json({
      user,
      dashboard: {
        xpCoins: user.xpCoins,
        activeChallenges: user.challengesJoined,
      },
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: res.__("user.server_error") });
  }
});
// POST /api/user/challenge/quit/:challengeId - Quit a challenge
router.post("/challenge/quit/:challengeId", verifyToken, async (req, res) => {
  try {
    const challenge = await Challenge.findById(req.params.challengeId);
    if (!challenge) return res.status(404).json({ msg: "Challenge not found" });

    challenge.participants = challenge.participants.filter(
      (id) => id.toString() !== req.user.id
    );
    await challenge.save();

    const user = await User.findById(req.user.id);
    user.challengesJoined = user.challengesJoined.filter(
      (cid) => cid.toString() !== challenge._id.toString()
    );
    await user.save();

    await sendNotification({
      userId: user._id,
      title: "You quit the challenge",
      message: `You’ve exited '${challenge.title}'. You can join again if it's open.`,
      type: "challenge",
    });

    res.json({ msg: "Challenge quit successfully" });
  } catch (err) {
    console.error("❌ Quit challenge error:", err);
    res.status(500).json({ msg: "Server error" });
  }
});

// ✅ POST /api/challenge/create - Create new challenge (Admin only)
router.post("/create", verifyToken, async (req, res) => {
  const {
    title,
    description,
    duration,
    xpReward,
    difficulty,
    startDate,
    dailyTasks,
  } = req.body;

  try {
    const challenge = new Challenge({
      title,
      description,
      duration,
      xpReward,
      difficulty,
      startDate,
      dailyTasks,
    });

    await challenge.save();
    res.status(201).json({ msg: "Challenge created", challenge });
  } catch (err) {
    console.error("❌ Challenge create error:", err);
    res.status(500).json({ msg: "Server error" });
  }
});

// ✅ GET /api/challenge/all - Get all challenges
router.get("/all", async (req, res) => {
  try {
    const challenges = await Challenge.find().sort({ createdAt: -1 });
    res.json(challenges);
  } catch (err) {
    console.error("❌ Fetch challenges error:", err);
    res.status(500).json({ msg: "Server error" });
  }
});

// ✅ POST /api/challenge/join/:challengeId - Join a challenge
router.post("/join/:challengeId", verifyToken, async (req, res) => {
  try {
    const challenge = await Challenge.findById(req.params.challengeId);
    if (!challenge) return res.status(404).json({ msg: "Challenge not found" });

    // Add user to participants if not already present
    if (!challenge.participants.includes(req.user.id)) {
      challenge.participants.push(req.user.id);
      await challenge.save();
    }

    res.json({ msg: "Challenge joined successfully", challenge });
  } catch (err) {
    console.error("❌ Join challenge error:", err);
    res.status(500).json({ msg: "Server error" });
  }
});

// ✅ DELETE /api/challenge/delete/:id - Delete a challenge (Admin only)
router.delete("/delete/:id", verifyToken, isAdmin, async (req, res) => {
    try {
      const challenge = await Challenge.findByIdAndDelete(req.params.id);
      if (!challenge) {
        return res.status(404).json({ msg: "Challenge not found" });
      }
  
      res.json({ msg: "Challenge deleted successfully", challenge });
    } catch (err) {
      console.error("❌ Delete challenge error:", err);
      res.status(500).json({ msg: "Server error" });
    }
  });
  

// POST /api/user/subscription - Update Subscription

router.post("/subscription", verifyToken, async (req, res) => {
  const { plan } = req.body;
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ msg: res.__("user.not_found") });
    user.subscription = plan;
    await user.save();
    res.json({ msg: res.__("user.subscription_updated"), subscription: plan });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: res.__("user.server_error") });
  }
});

router.put("/update", verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ msg: res.__("user.not_found") });

    const { name, age, gender, weight, height, goal } = req.body;

    if (name) user.name = name;
    if (age) user.age = age;
    if (gender) user.gender = gender;
    if (weight) user.weight = weight;
    if (height) user.height = height;
    if (goal) user.goal = goal;

    await user.save();
    res.json({ msg: res.__("user.profile_updated"), user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: res.__("user.server_error") });
  }
});

router.delete("/delete", verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ msg: res.__("user.not_found") });

    await User.findByIdAndDelete(req.user.id);
    res.json({ msg: res.__("user.deleted") });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: res.__("user.server_error") });
  }
});

module.exports = router;
