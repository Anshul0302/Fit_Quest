// script/createAdmin.js
const mongoose = require("mongoose");
mongoose.set("strictQuery", true);

const bcrypt = require("bcrypt");
require("dotenv").config();

const Admin = require("../models/Admin"); // adjust path as needed

const createAdmin = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://inventures:mongoose@cluster0.9ithelw.mongodb.net/fitQuest"
    );
    console.log("🛠️ Connected to DB");

    const existing = await Admin.findOne({
      email: "anshul.inventures@gmail.com",
    });
    if (existing) {
      console.log("⚠️ Admin already exists:", existing._id);
      return process.exit();
    }

    const hashedPassword = await bcrypt.hash("Admin123", 10);

    const admin = new Admin({
      name: "Inventures",
      username: "Inventures",
      email: "anshul.inventures@gmail.com",
      password: hashedPassword,
      role: "admin",
      isVerified: true,
      resetToken: null,
      otp: null,
      otpExpiry: null
    });
    

    await admin.save();
    console.log("✅ Admin created:", admin._id);
    process.exit();
  } catch (err) {
    console.error("❌ Error creating admin:", err.message);
    process.exit(1);
  }
};

createAdmin();
