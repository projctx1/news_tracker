require("dotenv").config();
const express = require("express");
const session = require("express-session");
const axios = require("axios");
const crypto = require("crypto");
const fs = require("fs");
const path = require("path");
const mime = require("mime-types");
const querystring = require("querystring");

const canvaRoute = express.Router();

// ---- ENV ----
const CANVA_API_BASE = process.env.CANVA_API_BASE;
const CANVA_CLIENT_ID = process.env.CANVA_CLIENT_ID;
const CANVA_SECRET = process.env.CANVA_SECRET;  
const CANVA_REDIRECT_URI = process.env.CANVA_REDIRECT_URI;

let dynamicAccessToken = process.env.CANVA_ACCESS_TOKEN || null;  

const canvaAxios = () =>
  axios.create({
    baseURL: CANVA_API_BASE,
    headers: { Authorization: `Bearer ${dynamicAccessToken}` },
  });

function generateCodeVerifier() {
  return crypto.randomBytes(32).toString("base64url");
}
function generateCodeChallenge(verifier) {
  return crypto.createHash("sha256").update(verifier).digest("base64url");
}
function generateState() {
  return crypto.randomBytes(16).toString("hex");
}

async function pollJobStatus(url, interval = 2000, maxAttempts = 10) {
  let attempts = 0;
  while (attempts < maxAttempts) {
    const { data } = await canvaAxios().get(url);
    if (data.status === "completed") return data;
    if (data.status === "failed") throw new Error("Job failed");
    await new Promise((r) => setTimeout(r, interval));
    attempts++;
  }
  throw new Error("Polling timed out");
}

function requireAccessToken(req, res, next) {
  if (!dynamicAccessToken) {
    return res
      .status(401)
      .json({ error: "Not authorized. Start OAuth at GET /canva/auth" });
  }
  next();
}

/**
 * AUTH: Step 1 - Redirect user to Canva with PKCE
 */
canvaRoute.get("/auth", (req, res) => {
  if (!CANVA_CLIENT_ID || !CANVA_REDIRECT_URI) {
    return res.status(500).json({ error: "Missing CANVA_CLIENT_ID or CANVA_REDIRECT_URI" });
  }

  const codeVerifier = generateCodeVerifier();
  const codeChallenge = generateCodeChallenge(codeVerifier);
  const state = generateState();

  req.session.oauthState = state;
  req.session.codeVerifier = codeVerifier;

  const authUrl =
    `https://www.canva.com/api/oauth/authorize?` +
    querystring.stringify({
      client_id: CANVA_CLIENT_ID,
      redirect_uri: CANVA_REDIRECT_URI,
      response_type: "code",
      scope: "asset:read asset:write app:read app:write brandtemplate:content:read brandtemplate:meta:read design:permission:read design:permission:write design:content:write design:content:read design:meta:read profile:read",
      code_challenge: codeChallenge,
      code_challenge_method: "S256",
      state,
    });

  // Ensure session is saved BEFORE redirect so state/verifier persist
  req.session.save((err) => {
    if (err) {
      console.error("Session save failed:", err);
      return res.status(500).json({ error: "Session error" });
    }
    return res.redirect(authUrl);
  });
});

/**
 * AUTH: Step 2 - Callback from Canva
 */
canvaRoute.get("/auth/callback", async (req, res) => {
  const { code, state } = req.query;

  if (!code || !state) {
    return res.status(400).json({ error: "Missing code or state" });
  }
  if (!req.session.oauthState || !req.session.codeVerifier) {
    return res.status(400).json({ error: "Session expired. Start OAuth again." });
  }
  if (state !== req.session.oauthState) {
    return res.status(400).json({ error: "State mismatch" });
  }

  const codeVerifier = req.session.codeVerifier;
  delete req.session.oauthState;
  delete req.session.codeVerifier;

  try {
    const { data } = await axios.post(
      "https://www.canva.com/api/oauth/token",
      querystring.stringify({
        grant_type: "authorization_code",
        code,
        redirect_uri: CANVA_REDIRECT_URI,
        client_id: CANVA_CLIENT_ID,
        code_verifier: codeVerifier,
      }),
      { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
    );

    dynamicAccessToken = data.access_token; // make subsequent API calls work
    // Optionally persist refresh_token here if returned (data.refresh_token)

    return res.json({ message: "OAuth success", token: data });
  } catch (err) {
    console.error("OAuth token exchange failed:", err.response?.data || err.message);
    return res.status(500).json({ error: "OAuth failed", details: err.response?.data });
  }
});

/**
 * Optional: logout/clear token
 */
canvaRoute.post("/auth/logout", (req, res) => {
  dynamicAccessToken = null;
  req.session.destroy(() => res.sendStatus(204));
});


/**
 * Upload an asset (raw binary + metadata header)
 */
canvaRoute.post("/upload-asset", requireAccessToken, async (req, res) => {
  try {
    const { filePath, assetName } = req.body;
    if (!filePath || !assetName) {
      return res.status(400).json({ error: "filePath and assetName are required" });
    }
    if (!fs.existsSync(filePath)) {
      return res.status(400).json({ error: `File not found at ${filePath}` });
    }

    const ct = mime.lookup(filePath) || "application/octet-stream";
    const fileStream = fs.createReadStream(path.resolve(filePath));

    const { data } = await canvaAxios().post("/asset-uploads", fileStream, {
      headers: {
        "Content-Type": ct,
        "Asset-Upload-Metadata": JSON.stringify({ name: assetName, mime_type: ct }),
      },
      maxBodyLength: Infinity,
    });

    const jobId = data.job_id;
    const result = await pollJobStatus(`/asset-uploads/${jobId}`);
    return res.json({ asset_id: result.asset_id, job: result });
  } catch (error) {
    console.error("Upload error:", error.response?.data || error.message);
    return res.status(500).json({ error: error.message, details: error.response?.data });
  }
});

/**
 * Autofill a brand template
 */
canvaRoute.post("/autofill-template", requireAccessToken, async (req, res) => {
  try {
    const { brandTemplateId, dataObject } = req.body;
    if (!brandTemplateId || !dataObject) {
      return res.status(400).json({ error: "brandTemplateId and dataObject required" });
    }

    const { data } = await canvaAxios().post("/autofills", {
      brand_template_id: brandTemplateId,
      data: dataObject,
    });

    const jobId = data.job_id;
    const result = await pollJobStatus(`/autofills/${jobId}`);
    return res.json({ design_id: result.design_id, job: result });
  } 
  catch (error) {
    console.error("Autofill error:", error.response?.data || error.message);
    return res.status(500).json({ error: error.message, details: error.response?.data });
  }
});


/**
 * Export a design
 */
canvaRoute.post("/export-design", requireAccessToken, async (req, res) => {
  try {
    const { designId, exportFormat } = req.body;
    if (!designId || !exportFormat) {
      return res.status(400).json({ error: "designId and exportFormat required" });
    }

    const { data } = await canvaAxios().post("/exports", {
      design_id: designId,
      format: exportFormat, // "png" | "pdf" | "mp4" etc.
    });

    const jobId = data.job_id;
    const result = await pollJobStatus(`/exports/${jobId}`);

    // Some jobs return multiple files; return whole result for flexibility
    return res.json({ download_url: result.download_url, job: result });
  } catch (error) {
    console.error("Export error:", error.response?.data || error.message);
    return res.status(500).json({ error: error.message, details: error.response?.data });
  }
});

module.exports = canvaRoute;
