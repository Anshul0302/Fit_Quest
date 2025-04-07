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
  params: async (req, file) => {
    const ext = file.originalname.split(".").pop().toLowerCase();

    let resourceType = "image";
    if (["pdf", "docx", "xlsx", "csv", "txt", "zip"].includes(ext)) {
      resourceType = "raw"; // Cloudinary's term for non-image files
    }

    return {
      folder: "uploads",
      format: ext,
      resource_type: resourceType,
    };
  },
});

module.exports = { cloudinary, storage };
