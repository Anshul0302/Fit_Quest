// routes/notification.js
const express = require("express");
const router = express.Router();
const Notification = require("../models/Notification");
const { verifyToken } = require("../middleware/auth");

// ✅ GET /api/notification - Get all user's notifications
router.get("/all", verifyToken, async (req, res) => {
  try {
    console.log("🔎 Logged-in user ID:", req.user.id);

    const notifications = await Notification.find({ user: req.user.id }).sort({
      createdAt: -1,
    });

    console.log("📦 Found Notifications:", notifications);

    console.log("📦 Found Notifications:", notifications.length);
    res.json(notifications);
  } catch (err) {
    console.error("❌ Error getting notifications:", err);
    res.status(500).json({ msg: "Server error" });
  }
});

// ✅ PUT /api/notification/read/:id - Mark as read
router.put("/read/:id", verifyToken, async (req, res) => {
  try {
    const updated = await Notification.findByIdAndUpdate(
      req.params.id,
      { read: true },
      { new: true }
    );
    if (!updated)
      return res.status(404).json({ msg: "Notification not found" });
    res.json({ msg: "Marked as read", notification: updated });
  } catch (err) {
    console.error("❌ Mark read error:", err);
    res.status(500).json({ msg: "Server error" });
  }
});

// ✅ DELETE /api/notification/:id - Delete a notification
router.delete("/:id", verifyToken, async (req, res) => {
  try {
    const deleted = await Notification.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id,
    });
    if (!deleted)
      return res.status(404).json({ msg: "Notification not found" });
    res.json({ msg: "Notification deleted" });
  } catch (err) {
    console.error("❌ Delete error:", err);
    res.status(500).json({ msg: "Server error" });
  }
});

// ✅ PUT /api/notification/mark-all-read - Mark all as read
router.put("/mark-all-read", verifyToken, async (req, res) => {
  try {
    await Notification.updateMany(
      { user: req.user.id, read: false },
      { $set: { read: true } }
    );
    res.json({ msg: "All notifications marked as read" });
  } catch (err) {
    console.error("❌ Bulk mark read error:", err);
    res.status(500).json({ msg: "Server error" });
  }
});

module.exports = router;
