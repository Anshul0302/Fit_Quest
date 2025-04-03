const express = require("express");
const router = express.Router();
const stripe = require("../config/stripe");
const { verifyToken } = require("../middleware/auth");

// 🎯 Create payment intent for product or subscription
router.post("/create-payment-intent", verifyToken, async (req, res) => {
  const { amount, currency, description } = req.body;

  // ✅ Validate amount
  if (!amount || amount < 100) {
    return res.status(400).json({ msg: res.__("payment.invalid_amount") });
  }

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: currency || "usd",
      description,
      metadata: {
        userId: req.user.id,
        type: description.includes("Subscription") ? "subscription" : "product",
      },
    });

    console.log("💳 Created PaymentIntent:", paymentIntent.id);
    res.json({ clientSecret: paymentIntent.client_secret });
  } catch (err) {
    console.error("❌ Stripe error:", err);
    res.status(500).json({ msg: res.__("payment.creation_failed") });
  }
});
