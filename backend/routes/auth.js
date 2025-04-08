// routes/auth.js
const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const { check, validationResult } = require("express-validator");
const nodemailer = require("nodemailer");

const User = require("../models/User");
const Admin = require("../models/Admin");

// POST /api/auth/signup - User Registration
router.post(
  "/signup",
  [
    check("name", "Name is required").notEmpty(),
    check("email", "Please include a valid email").isEmail(),
    check("password", "Password must be 6 or more characters").isLength({
      min: 6,
    }),
  ],
  async (req, res) => {
    console.log("📌 Received Request Body:", req.body);

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { name, email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (user) {
        return res.status(400).json({ msg: res.__("auth.user_exists") });
      }
      user = new User({ name, email, password });
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);

      const otp = Math.floor(100000 + Math.random() * 900000).toString();
      user.otp = otp;
      user.otpExpiry = new Date(Date.now() + 10 * 60 * 1000);

      await user.save();

      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: "Your OTP for Fitness Quest Verification",
        text: `Your OTP is ${otp}. It will expire in 10 minutes.`,
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) console.error("Error sending email:", error);
        else console.log("Email sent: " + info.response);
      });

      const payload = { user: { id: user.id, role: "user" } };
      jwt.sign(
        payload,
        process.env.JWT_SECRET,
        { expiresIn: "7d" },
        (err, token) => {
          if (err) throw err;
          res.json({ token, user, msg: res.__("auth.otp_sent") });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send(res.__("auth.server_error"));
    }
  }
);
//GEt get all users
router.get("/allusers", async (req, res) => {
  try {
    const users = await User.find().select(
      "-password -otp -otpExpiry -resetToken -resetTokenExpiry"
    );
    res.status(200).json(users);
  } catch (err) {
    console.error("❌ Error fetching users:", err);
    res.status(500).json({ msg: "Server error" });
  }
});

router.post("/verify-otp", async (req, res) => {
  const { email, otp } = req.body;
  const jwt = require("jsonwebtoken");

  try {
    // Look in both Admin and User
    const user =
      (await User.findOne({ email })) || (await Admin.findOne({ email }));

    if (!user) return res.status(404).json({ msg: "User/Admin not found" });

    if (!user.otp || user.otp !== otp || user.otpExpiry < Date.now()) {
      return res.status(400).json({ msg: "Invalid or expired OTP" });
    }

    const resetToken = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "15m",
    });

    user.resetToken = resetToken;
    user.resetTokenExpiry = Date.now() + 15 * 60 * 1000;
    user.otp = null;
    user.otpExpiry = null;

    await user.save();
    res.json({ msg: "OTP verified", token: resetToken });
  } catch (err) {
    console.error("❌ OTP verify error:", err.message);
    res.status(500).json({ msg: "Server error" });
  }
});

// 📩 Resend OTP
router.post("/resend-otp", async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ msg: "Email is required." });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ msg: "User not found." });

    // Optional: Prevent too frequent resends (e.g., wait 60 seconds)
    const now = new Date();
    if (user.otpExpiry && now < user.otpExpiry && user.otp) {
      return res.status(400).json({
        msg: "OTP already sent. Please wait before requesting a new one.",
      });
    }

    // 🔁 Generate new OTP
    const newOtp = Math.floor(100000 + Math.random() * 900000).toString();
    user.otp = newOtp;
    user.otpExpiry = new Date(Date.now() + 10 * 60 * 1000); // expires in 10 mins
    await user.save();

    // ✅ Send email again
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Your New OTP for Fitness Quest",
      text: `Your new OTP is ${newOtp}. It will expire in 10 minutes.`,
    };

    await transporter.sendMail(mailOptions);
    res.json({ msg: "New OTP sent to your email." });
  } catch (err) {
    console.error("❌ Resend OTP error:", err);
    res.status(500).json({ msg: "Server error" });
  }
});

// POST /api/auth/admin/login
router.post("/admin/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const admin = await Admin.findOne({ email });
    if (!admin) return res.status(400).json({ msg: "Admin not found" });

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch)
      return res.status(400).json({ msg: "Invalid email or password." });

    const token = jwt.sign(
      { user: { id: admin._id, role: "admin" } },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({ msg: "Admin logged in successfully", token });
  } catch (err) {
    console.error("❌ Admin login error:", err.message);
    res.status(500).json({ msg: "Server error" });
  }
});

router.post(
  "/login",
  [
    check("email", "Please include a valid email").isEmail(),
    check("password", "Password is required").exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    try {
      const user = await User.findOne({ email });
      if (!user)
        return res
          .status(400)
          .json({ msg: res.__("auth.invalid_credentials") });
      if (!user.password)
        return res.status(400).json({ msg: res.__("auth.google_only") });

      const isMatch = await bcrypt.compare(password, user.password);
      console.log("✅ Password match:", isMatch);

      if (!isMatch)
        return res
          .status(400)
          .json({ msg: res.__("auth.invalid_credentials") });

      const payload = { user: { id: user.id, role: "user" } };
      jwt.sign(
        payload,
        process.env.JWT_SECRET,
        { expiresIn: "7d" },
        (err, token) => {
          if (err) throw err;
          res.json({ token, user });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send(res.__("auth.server_error"));
    }
  }
);

router.post("/forgot-password", async (req, res) => {
  const { email } = req.body;
  if (!email)
    return res.status(400).json({ msg: res.__("auth.email_required") });

  try {
    // Try to find user first
    let user = await User.findOne({ email });
    let isAdmin = false;

    // If not a user, check in Admin model
    if (!user) {
      user = await Admin.findOne({ email });
      isAdmin = true;
    }

    if (!user)
      return res.status(400).json({ msg: res.__("auth.user_not_found") });

    // 🔐 Generate 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    // 🔒 Set reset token and OTP
    const resetToken = jwt.sign(
      { userId: user._id, role: isAdmin ? "admin" : "user" },
      process.env.JWT_SECRET,
      { expiresIn: "15m" }
    );

    user.resetToken = resetToken;
    user.resetTokenExpiry = Date.now() + 15 * 60 * 1000;
    user.otp = otp;
    user.otpExpiry = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes expiry
    await user.save();

    // ✉️ Send OTP Email
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Your OTP for Password Reset",
      text: `Your 6-digit OTP is ${otp}. It will expire in 10 minutes.`,
    };

    await transporter.sendMail(mailOptions);
    res.json({ msg: res.__("auth.password_reset_email_sent") });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: res.__("auth.server_error") });
  }
});

router.post("/reset-password", async (req, res) => {
  const { token, newPassword } = req.body;
  if (!token || !newPassword) {
    return res.status(400).json({ msg: "Invalid request" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Search in both Admin and User collections
    let user =
      (await User.findById(decoded.userId)) ||
      (await Admin.findById(decoded.userId));

    if (!user) return res.status(404).json({ msg: "User/Admin not found" });

    if (Date.now() > user.resetTokenExpiry) {
      return res.status(400).json({ msg: "Token expired" });
    }

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword, salt);

    user.resetToken = null;
    user.resetTokenExpiry = null;

    await user.save();
    res.json({ msg: "Password reset successfully" });
  } catch (err) {
    console.error("❌ Reset error:", err.message);
    res.status(400).json({ msg: "Invalid token" });
  }
});

router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/login" }),
  (req, res) => {
    const payload = { user: { id: req.user.id, role: "user" } };
    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: "7d" },
      (err, token) => {
        if (err) throw err;
        res.redirect(`http://172.16.11.30:8000/oauth-success?token=${token}`);
      }
    );
  }
);

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

module.exports = router;
