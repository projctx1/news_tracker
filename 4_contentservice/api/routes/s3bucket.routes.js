/**
 * @file s3.js
 * @description Express route handlers for uploading files (images, videos, documents)
 *              to AWS S3 (SDK v3) with folder-based separation.
 */

require('dotenv').config();
const express = require('express');
const multer = require('multer');
const {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand,
} = require('@aws-sdk/client-s3');

const s3Route = express.Router();

const REGION =
  process.env.AWSS3REGION ||
  process.env.AWS_REGION;

const ACCESS_KEY_ID =
  process.env.AWSACCESSKEY ||
  process.env.AWS_ACCESS_KEY_ID;

const SECRET_ACCESS_KEY =
  process.env.AWSSECRETACCESSKEY ||
  process.env.AWS_SECRET_ACCESS_KEY;

const Bucket =
  process.env.AWS_BUCKET_NAME ||
  'scrapperservicedata';

const s3Client = new S3Client({
  region: REGION,
  credentials: {
    accessKeyId: ACCESS_KEY_ID,
    secretAccessKey: SECRET_ACCESS_KEY,
  },
});

const upload = multer({ storage: multer.memoryStorage() });

const safeName = (name = '') =>
  name
    .replace(/\s+/g, '-')
    .replace(/[^a-zA-Z0-9.\-_]/g, '')
    .toLowerCase();

async function uploadToS3(file, folderName) {
  const key = `${folderName}/${Date.now()}-${safeName(file.originalname)}`;

  const command = new PutObjectCommand({
    Bucket,
    Key: key,
    Body: file.buffer,
    ContentType: file.mimetype,
  });

  await s3Client.send(command);

  const url = `https://${Bucket}.s3.${REGION}.amazonaws.com/${key}`;
  return { key, url };
}

async function deleteFromS3(key) {
  const command = new DeleteObjectCommand({ Bucket, Key: key });
  await s3Client.send(command);
}

const fileTypes = ['images', 'videos', 'docs'];

fileTypes.forEach((type) => {
  s3Route.post(`/${type}`, upload.single('file'), async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded' });
      }

      const { key, url } = await uploadToS3(req.file, type);
      return res.json({
        message: `${type} uploaded successfully`,
        key,
        url,
      });

    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: `${type} upload failed` });
    }
  });
});

module.exports = s3Route;
