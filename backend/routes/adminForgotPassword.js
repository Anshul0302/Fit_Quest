const express = require("express");
const router = express.Router();
const Admin = require("../models/Admin");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");

// Send OTP
router.post("/admin/forgot-password", async (req, res) => {
  const { email } = req.body;
  try {
    const admin = await Admin.findOne({ email });
    if (!admin) return res.status(404).json({ msg: "Admin not found" });

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, {
      expiresIn: "15m",
    });

    admin.resetToken = token;
    admin.otp = otp;
    admin.otpExpiry = Date.now() + 10 * 60 * 1000;
    await admin.save();

    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS },
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Admin Password Reset OTP",
      text: `Your OTP is ${otp}. It will expire in 10 minutes.`,
    });

    res.json({ msg: "OTP sent to email" });
  } catch (err) {
    console.error("❌ Forgot password error:", err);
    res.status(500).json({ msg: "Server error" });
  }
});

// Verify OTP & Get Reset Token
router.post("/admin/verify-otp", async (req, res) => {
  const { email, otp } = req.body;
  try {
    const admin = await Admin.findOne({ email });
    if (!admin || admin.otp !== otp || admin.otpExpiry < Date.now()) {
      return res.status(400).json({ msg: "Invalid or expired OTP" });
    }

    const token = admin.resetToken;
    res.json({ msg: "OTP verified", token });
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
});

// Reset password
router.post("/admin/reset-password", async (req, res) => {
  const { token, newPassword } = req.body;
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const admin = await Admin.findById(decoded.id);
    if (!admin || admin.resetToken !== token) {
      return res.status(400).json({ msg: "Invalid or expired token" });
    }

    const hashed = await bcrypt.hash(newPassword, 10);
    admin.password = hashed;
    admin.resetToken = undefined;
    admin.otp = undefined;
    admin.otpExpiry = undefined;
    await admin.save();

    res.json({ msg: "Password reset successful" });
  } catch (err) {
    res.status(500).json({ msg: "Reset error" });
  }
});

module.exports = router;
