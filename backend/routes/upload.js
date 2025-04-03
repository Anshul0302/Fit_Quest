const express = require("express");
const multer = require("multer");
const { v2: cloudinary } = require("cloudinary");
const { storage } = require("../config/cloudinary");
const upload = multer({ storage });
const router = express.Router();

// ✅ POST /api/upload/image - Upload an image
router.post("/image", upload.single("image"), (req, res) => {
  console.log("📸 Route hit: /api/upload/image");

  try {
    if (!req.file) {
      console.log("⚠️ No file received in req.file");
      return res.status(400).json({ msg: res.__("upload.no_image") });
    }

    console.log("✅ File received from multer/cloudinary:", req.file);

    res.json({
      msg: res.__("upload.image_success"),
      imageUrl: req.file.path,
      public_id: req.file.filename,
    });
  } catch (err) {
    console.error("❌ Upload error:", err);
    res
      .status(500)
      .json({ msg: res.__("upload.server_error"), error: err.message });
  }
});

// ✅ POST /api/upload/file - Upload a generic file
router.post("/file", upload.single("file"), (req, res) => {
  console.log("📁 File upload hit");

  try {
    if (!req.file) {
      console.log("⚠️ No file uploaded");
      return res.status(400).json({ msg: res.__("upload.no_file") });
    }

    console.log("✅ File received:", req.file);

    res.json({
      msg: res.__("upload.file_success"),
      fileUrl: req.file.path,
      public_id: req.file.filename,
    });
  } catch (err) {
    console.error("❌ File upload error:", err);
    res
      .status(500)
      .json({ msg: res.__("upload.server_error"), error: err.message });
  }
});

// ✅ DELETE /api/upload/delete/:id - Delete file from Cloudinary
router.delete("/delete", async (req, res) => {
  const publicId = req.query.public_id;
  console.log("🗑️ Deleting public_id:", publicId);

  if (!publicId) {
    return res.status(400).json({ msg: res.__("upload.missing_id") });
  }

  try {
    let result = await cloudinary.uploader.destroy(publicId, {
      resource_type: "image",
    });

    if (result.result !== "ok") {
      console.log("❗ Not found as image, trying as raw...");
      result = await cloudinary.uploader.destroy(publicId, {
        resource_type: "raw",
      });
    }

    if (result.result !== "ok") {
      return res
        .status(400)
        .json({ msg: res.__("upload.delete_failed"), result });
    }

    console.log("✅ Delete success:", result);
    res.json({ msg: res.__("upload.delete_success"), result });
  } catch (err) {
    console.error("❌ Delete error:", err);
    res
      .status(500)
      .json({ msg: res.__("upload.server_error"), error: err.message });
  }
});

module.exports = router;
