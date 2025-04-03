const Notification = require("../models/Notification");

const sendNotification = async ({
  userId,
  title,
  message,
  type = "system",
}) => {
  try {
    console.log("📨 Creating notification for user:", userId);

    // Create a new notification object
    const notification = new Notification({
      user: userId,
      title,
      message,
      type,
    });

    // Save the notification and check if it was saved correctly
    const savedNotification = await notification.save();
    console.log("✅ Notification saved in DB:", savedNotification);

    return savedNotification;
  } catch (err) {
    console.error("❌ Notification Save Error:", err.message);
  }
};

module.exports = sendNotification;
