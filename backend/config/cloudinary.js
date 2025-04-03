const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || "not_set",
  api_key: process.env.CLOUDINARY_API_KEY || "not_set",
  api_secret: process.env.CLOUDINARY_API_SECRET || "not_set",
});

console.log("🔧 Cloudinary config:", {
  name: process.env.CLOUDINARY_CLOUD_NAME,
  key: process.env.CLOUDINARY_API_KEY ? "✅" : "❌",
  secret: process.env.CLOUDINARY_API_SECRET ? "✅" : "❌",
});

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "fitness-quest",
    allowed_formats: ["jpg", "jpeg", "png", "pdf", "docx", "xlsx"], // ✅ Include files
    resource_type: "auto", // ✅ auto = images, raw, video
  },
});

module.exports = { cloudinary, storage };
