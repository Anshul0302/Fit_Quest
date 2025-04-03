require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const winston = require("winston");
const passport = require("passport");
const connectDB = require("./config/db");
// const adminRoutes = require("./routes/admin"); // Import admin routes
const i18n = require("i18n");
const taskLogRoutes = require("./routes/taskLog");


const app = express();

// ✅ Middlewares (Corrected)
app.use(express.json()); // Parses JSON body
app.use(express.urlencoded({ extended: true })); // Parses form data
app.use(cors());

i18n.configure({
  locales: ["en", "es"],
  directory: __dirname + "/locales",
  queryParameter: "lang",
  autoReload: true,
  updateFiles: false,
  objectNotation: true,
});

app.use(i18n.init);

// ✅ Winston Logger Setup
const logger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [new winston.transports.Console()],
});

// ✅ Connect to MongoDB
connectDB();

// ✅ Passport configuration
require("./config/passport");
app.use(passport.initialize());

// ✅ Morgan Logger (Corrected)
app.use(
  morgan("combined", { stream: { write: (msg) => logger.info(msg.trim()) } })
);

// ✅ Mount Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/user", require("./routes/user"));
app.use("/api/store", require("./routes/store"));
app.use("/api/admin", require("./routes/admin"));
app.use("/api/upload", require("./routes/upload"));
app.use("/api/verify", require("./routes/verify"));
app.use("/api/challenge", require("./routes/user"));
app.use("/api/notification", require("./routes/notification"));
app.use("/api/task-log", taskLogRoutes); 
app.use("/api/subscription", require("./routes/subscription"));
app.use("/api/referral", require("./routes/referral"));

// ✅ Global Error Handling Middleware
app.use((err, req, res, next) => {
  logger.error(err.stack);
  res.status(500).json({ msg: "Internal Server Error" });
});

app.use((err, req, res, next) => {
  console.error("🔥 GLOBAL ERROR:", err);
  res.status(500).json({ msg: "Something broke", error: err.message });
});

// ✅ Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => logger.info(`Server running on port ${PORT}`));
