require('dotenv').config();
const express = require('express');
const axios = require('axios');
const bannerRoute = express.Router();
const fs = require('fs');
const path = require('path');

const MASTER_API_KEY = process.env.BANNERBEAR_PROJECT_API_KEY;
const PROJECT_ID = process.env.BANNERBEAR_PROJECT_ID;  
const BASE_URL = 'https://api.bannerbear.com/v2';
const SYNC_BASE_URL = 'https://sync.api.bannerbear.com/v2';

async function bannerbearFetch  (endpoint, options = {}, sync = false) {
  const url = `${sync ? SYNC_BASE_URL : BASE_URL}${endpoint}`;
  
  try {
    const response = await axios({
      url,
      method: options.method || 'GET',
      headers: {
        'Authorization': `Bearer ${MASTER_API_KEY}`,
        'Content-Type': 'application/json',
        ...(options.headers || {})
      },
      data: options.body || undefined,
      timeout: 60000
    });
    return { status: response.status, data: response.data };
  } catch (error) {
    return {
      status: error.response?.status || 500,
      data: error.response?.data || { error: error.message }
    };
  }
};

/**
 * Authentication and Account
 */
bannerRoute.get('/auth', async (req, res) => {
  const result = await bannerbearFetch('/auth');
  res.status(result.status).json(result.data);
});


/**
 * Templates
 */
bannerRoute.get('/templates', async (req, res) => {
  const result = await bannerbearFetch('/templates');
  res.status(result.status).json(result.data);
});

bannerRoute.get('/templates/:uid', async (req, res) => {
  const result = await bannerbearFetch(`/templates/${req.params.uid}`);
  res.status(result.status).json(result.data);
});

/**
 * Images
 */
bannerRoute.get('/images', async (req, res) => {
  const result = await bannerbearFetch('/images');
  res.status(result.status).json(result.data);
});

bannerRoute.get('/images/:uid', async (req, res) => {
  const result = await bannerbearFetch(`/images/${req.params.uid}`);
  res.status(result.status).json(result.data);
});

bannerRoute.get('/images/export/:uid', async (req, res) => {
  try {
    const imageResult = await bannerbearFetch(`/images/${req.params.uid}`);
    
    if (imageResult.status !== 200 || !imageResult.data?.image_url) {
      return res.status(imageResult.status).json({ error: 'Image not found or not ready.' });
    }

    const contentType = imageResp?.headers['content-type'] || 'image/png';
    const ext = contentType.split('/')[1]; // e.g., "png" or "jpeg"

    const imageUrl = imageResult.data.image_url;
    const fileName = `${req.params.uid}.${ext}`; 
    const savePath = path.join(__dirname, '../wwwroot/images', fileName);

    const imageResp = await axios.get(imageUrl, { responseType: 'arraybuffer' });

    fs.writeFileSync(savePath, imageResp.data);

    res.json({
      uid: req.params.uid,
      fileName,
      savedPath: savePath,
      message: 'Image saved successfully!'
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

bannerRoute.post('/generate-image', async (req, res) => {
  const {
    template,
    modifications,
    render_pdf,
    transparent,
    metadata
  } = req.body;

  const payload = {
    template,
    modifications,
    ...(render_pdf !== undefined ? { render_pdf } : {}),
    ...(transparent !== undefined ? { transparent } : {}),
    ...(metadata !== undefined ? { metadata } : {}),
    project_id: PROJECT_ID
  };

  const result = await bannerbearFetch('/images', {
    method: 'POST',
    body: payload
  }, true); // sync mode

  res.status(result.status).json(result.data);
});


/**
 * Videos
 */
bannerRoute.get('/videos', async (req, res) => {
  const result = await bannerbearFetch('/videos');
  res.status(result.status).json(result.data);
});

bannerRoute.get('/videos/:uid', async (req, res) => {
  const result = await bannerbearFetch(`/videos/${req.params.uid}`);
  res.status(result.status).json(result.data);
});

bannerRoute.post('/generate-video', async (req, res) => {
  try {
    const {
      video_template,
      template = null,  
      modifications,
      input_media_url,
      webhook_url,
      metadata
    } = req.body;

    // Use video_template if present, else template
    const payload = {
      video_template: video_template || template,  
      modifications,
      ...(input_media_url ? { input_media_url } : {}),
      ...(webhook_url !== undefined ? { webhook_url } : {}), 
      ...(metadata !== undefined ? { metadata } : {}),
      project_id: PROJECT_ID
    };

    const result = await bannerbearFetch('/videos', {
      method: 'POST',
      body: payload
    });

    res.status(result.status).json(result.data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

bannerRoute.get('/videos/export/:uid', async (req, res) => {
  try {
    const videoResult = await bannerbearFetch(`/videos/${req.params.uid}`);

    if (videoResult.status !== 200 || !videoResult.data?.video_url) {
      return res.status(videoResult.status).json({ error: 'Video not found or not ready.' });
    }

    const videoUrl = videoResult.data.video_url;

    const videoResp = await axios.get(videoUrl, { responseType: 'arraybuffer' });

    const contentType = videoResp.headers['content-type'] || 'video/mp4';
    const ext = contentType.split('/')[1]; // e.g., "mp4", "mov"

    const saveDir = path.join(__dirname, '../wwwroot/videos');
    if (!fs.existsSync(saveDir)) fs.mkdirSync(saveDir, { recursive: true });

    const fileName = `${req.params.uid}.${ext}`;
    const savePath = path.join(saveDir, fileName);

    fs.writeFileSync(savePath, videoResp.data);

    res.json({
      uid: req.params.uid,
      fileName,
      savedPath: savePath,
      message: 'Video saved successfully!'
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


module.exports = bannerRoute;
