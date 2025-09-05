require("dotenv").config();
import express from "express";
import FileUpload from "../db/models/file_upload.js";
import multer from "multer";
import multerS3 from "multer-s3-v3";   
import s3 from "../db/config/s3.js";

const upload = multer({
  storage: multerS3({
    s3: s3,                          
    bucket: process.env.AWS_S3_BUCKET,
    key: (req, file, cb) => {
      const fileName = `${Date.now()}_${file.originalname}`;
      cb(null, fileName);
    },
  }),
});

const router = express.Router();

/**
 * @route POST /files/upload
 * @desc Upload file to S3 and save record
 */
router.post("/upload/:userId", upload.single("file"), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: "No file uploaded" });

    const file = new FileUpload({
      name: req.file.originalname,
      url: req.file.location,     
      filepath: req.file.key,
      size: req.file.size,
      meta_data: { mimetype: req.file.mimetype },
      user: req.params.userId,
    });

    await file.save();
    res.json({ message: "File uploaded successfully", file });
  } catch (err) {
    console.error("Upload error:", err);
    res.status(500).json({ error: "Error uploading file" });
  }
});

/**
 * @route GET /files/user/:userId
 * @desc Get all files uploaded by a user
 */
router.get("/user/:userId", async (req, res) => {
  try {
    const files = await FileUpload.find({ user: req.params.userId }).populate(
      "user",
      "name email"
    );
    res.json(files);
  } catch (err) {
    console.error("Fetch error:", err);
    res.status(500).json({ error: "Error fetching files" });
  }
});

export default router;
