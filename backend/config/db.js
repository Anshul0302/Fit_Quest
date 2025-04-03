// config/db.js
const mongoose = require("mongoose");
const winston = require("winston");
mongoose.set("strictQuery", false); // ✅ Add this line to remove the warning

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    winston.info("MongoDB connected");
  } catch (err) {
    winston.error("MongoDB connection error:", err);
    process.exit(1);
  }
};

module.exports = connectDB;
