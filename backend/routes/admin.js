const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/User");
const { verifyToken } = require("../middleware/auth");
const { isAdmin } = require("../middleware/adminCheck");
const Admin = require("../models/Admin");
// Middleware to secure routes below - Only admin can access

// ✅ Get All Admins
router.get("/admin/all", async (req, res) => {
  try {
    const admins = await Admin.find(); // Ensure the model Admin is imported correctly
    if (!admins || admins.length === 0) {
      return res.status(404).json({ msg: "No admins found in the database." });
    }
    res.json(admins);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: "Server error" });
  }
});

// ✅ Delete Admin
// routes/admin.js
router.delete("/admin/:id", async (req, res) => {
    try {
      const admin = await Admin.findByIdAndDelete(req.params.id);
      if (!admin) {
        return res.status(404).json({ msg: "Admin not found" });
      }
      res.status(200).json({ msg: "Admin deleted successfully" });
    } catch (err) {
      console.error("❌ Error deleting admin:", err);
      res.status(500).json({ msg: "Server error" });
    }
  });
  

// ✅ Create Admin
router.post("/admin/create", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    let existingAdmin = await User.findOne({ email, role: "admin" });
    if (existingAdmin) {
      return res.status(400).json({ msg: res.__("admin.already_exists") });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newAdmin = new User({
      name,
      email,
      password: hashedPassword,
      role: "admin",
    });

    await newAdmin.save();
    res.status(201).json({ msg: res.__("admin.created"), admin: newAdmin });
  } catch (err) {
    console.error("Error creating admin:", err);
    res
      .status(500)
      .json({ msg: res.__("admin.server_error"), error: err.message });
  }
});



// GET /api/admin/dashboard - Admin Dashboard Stats
router.get("/dashboard", async (req, res) => {
  try {
    const usersCount = await require("../models/User").countDocuments();
    const challengesCount =
      await require("../models/Challenge").countDocuments();
    const ordersCount = await require("../models/Order").countDocuments();
    res.json({ usersCount, challengesCount, ordersCount });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: res.__("admin.dashboard_error") });
  }
});

// GET /api/admin/users - Get All Users

router.get("/users", async (req, res) => {
  try {
    const users = await require("../models/User").find();
    res.json(users);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: res.__("auth.users_fetch_error") });
  }
});

// GET /api/admin/orders -  Orders Maneg by Admin
router.get("/orders", async (req, res) => {
  try {
    const orders = await require("../models/Order").find().populate("user");
    res.json(orders);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: res.__("auth.orders_fetch_error") });
  }
});

// GET /api/admin/challenges - Get All Challenges
router.get("/challenges", async (req, res) => {
  try {
    const challenges = await require("../models/Challenge").find();
    res.json(challenges);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: res.__("auth.challenges_fetch_error") });
  }
});

module.exports = router;
