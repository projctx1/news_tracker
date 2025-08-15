/**
 * @file s3.js
 * @description Express route handlers for uploading files (images, videos, documents)
 *              to AWS S3 with folder-based separation.
 */

require('dotenv').config();
const express = require('express');
const AWS = require('aws-sdk');
const multer = require('multer');

const s3Route = express.Router();

/**
 * AWS S3 configuration
 * Loads credentials from environment variables and initializes
 * an S3 instance for uploads.
 */
const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,    
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY, 
  region: process.env.AWS_REGION                
});

/**
 * Multer configuration
 * Uses memory storage so the file is stored in RAM before being sent to S3.
 */
const upload = multer({ storage: multer.memoryStorage() });

/**
 * uploadToS3
 * @description Uploads a file buffer to S3 inside the specified folder.
 * @param {Object} file - Multer file object containing buffer and metadata.
 * @param {String} folderName - The folder name in the bucket to store the file.
 * @returns {String} - Public URL of the uploaded file.
 */
async function uploadToS3(file, folderName) {
  const fileName = `${folderName}/${Date.now()}-${file.originalname}`;

  const params = {
    Bucket: process.env.AWS_BUCKET_NAME,  
    Key: fileName,                       
    Body: file.buffer,                    
    ContentType: file.mimetype,           
    ACL: 'public-read'                    /* Make file publicly accessible */
  };

  const data = await s3.upload(params).promise();
  return data.Location; /* Return public URL */
}

const fileTypes = ['images', 'videos', 'docs'];

/**
 * Dynamic route creation
 * Creates POST routes for each file type.
 * Example:
 *   POST /images → uploads to /images folder in S3
 *   POST /videos → uploads to /videos folder in S3
 *   POST /docs   → uploads to /docs folder in S3
 */
fileTypes.forEach(type => {
  s3Route.post(`/${type}`, upload.single('file'), async (req, res) => {
    try 
    {
      /* Validate file presence */
      if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded' });
      }

      /* Upload to S3 in the correct folder */
      const url = await uploadToS3(req.file, type);

      /* Respond with success message and file URL */
      res.json({ message: `${type} uploaded successfully`, url });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: `${type} upload failed` });
    }
  });
});

module.exports = s3Route;
