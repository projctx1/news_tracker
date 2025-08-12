require('dotenv').config();
const express = require('express');
const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');

const canvaRoute = express.Router();

const CANVA_API_BASE = process.env.CANVA_API_BASE || 'https://api.canva.com/v1';
const CANVA_ACCESS_TOKEN = process.env.CANVA_ACCESS_TOKEN;

const canvaAxios = axios.create({
  baseURL: CANVA_API_BASE,
  headers: {
    Authorization: `Bearer ${CANVA_ACCESS_TOKEN}`,
  },
});


/**
 * Helper: Poll job status
 * @param {*} url 
 * @param {*} interval 
 * @param {*} maxAttempts 
 * @returns 
 */
async function pollJobStatus(url, interval = 2000, maxAttempts = 10) {
  let attempts = 0;
  while (attempts < maxAttempts) {
    const response = await canvaAxios.get(url);
    const data = response.data;
    if (data.status === 'completed') {
      return data;
    } else if (data.status === 'failed') {
      throw new Error('Job failed');
    }
    await new Promise((r) => setTimeout(r, interval));
    attempts++;
  }
  throw new Error('Polling timed out');
}

/**
 * Post to upload asset
 */
canvaRoute.post('/upload-asset', async (req, res) => {
  try {
    // Expecting req.body to contain: filePath, assetName
    // In production, replace this with actual file upload handling
    const { filePath, assetName } = req.body;

    if (!filePath || !assetName) {
      return res.status(400).json({ error: 'filePath and assetName are required' });
    }

    // Read file buffer
    const fileBuffer = fs.readFileSync(filePath);

    // Build FormData for the upload
    const formData = new FormData();
    formData.append('file', fileBuffer, assetName);

    // Send POST /v1/asset-uploads with metadata header
    const uploadResponse = await canvaAxios.post(
      '/asset-uploads',
      fileBuffer,
      {
        headers: {
          ...formData.getHeaders(),
          'Asset-Upload-Metadata': JSON.stringify({ name: assetName }),
        },
      }
    );

    const jobId = uploadResponse.data.job_id;

    // Poll for completion
    const jobResult = await pollJobStatus(`/asset-uploads/${jobId}`);

    res.json({ asset_id: jobResult.asset_id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * 2. Autofill a brand template
 * req.body should have: brandTemplateId, 
 * dataObjectdataObject maps field names to values, e.g. { image1: 'asset_id', text1: 'Hello' }
 */
canvaRoute.post('/autofill-template', async (req, res) => {
  try {
    const { brandTemplateId, dataObject } = req.body;
    if (!brandTemplateId || !dataObject) {
      return res.status(400).json({ error: 'brandTemplateId and dataObject required' });
    }

    // Start autofill job
    const autofillResponse = await canvaAxios.post('/autofills', {
      brand_template_id: brandTemplateId,
      data: dataObject,
    });

    const jobId = autofillResponse.data.job_id;

    // Poll for completion
    const jobResult = await pollJobStatus(`/autofills/${jobId}`);

    res.json({ design_id: jobResult.design_id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * 3. Export a design
 *  req.body should have: designId, exportFormat (png, pdf, mp4)
 */
canvaRoute.post('/export-design', async (req, res) => {
  try {
    const { designId, exportFormat } = req.body;
    if (!designId || !exportFormat) {
      return res.status(400).json({ error: 'designId and exportFormat required' });
    }

    const exportResponse = await canvaAxios.post('/exports', {
      design_id: designId,
      format: exportFormat,
    });

    const jobId = exportResponse.data.job_id;

    // Poll export status
    const jobResult = await pollJobStatus(`/exports/${jobId}`);

    // Return the download URL or file info
    res.json({ download_url: jobResult.download_url });
  } 
  catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = canvaRoute;
