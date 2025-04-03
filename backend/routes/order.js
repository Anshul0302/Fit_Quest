const sendNotification = require("../utils/sendNotification");

await sendNotification({
  userId: req.user.id,
  title: "Order Placed ✅",
  message: `Your order has been placed and is being processed.`,
  type: "order",
});

console.log("🧠 User ID passed to sendNotification:", req.user?.id);
console.log("✅ Notification send triggered.");
