exports.isAdmin = (req, res, next) => {
  console.log("🔍 req.user in isAdmin middleware:", req.user);
  if (!req.user || req.user.role !== "admin") {
    console.log("❌ Access denied. Role:", req.user?.role);
    return res.status(403).json({ msg: "Access denied: Admins only." });
  }
  console.log("✅ Admin access granted.");
  next();
};
