require("dotenv").config();
import express from "express";
import AppUser from "../db/models/app_user.js";
import MetaUser from "../db/models/meta_user.model.js";
import TwitterUser from "../db/models/twitter_user.model.js";
import axios from "axios";
import crypto from "crypto";

import {
  CognitoIdentityProviderClient,
  SignUpCommand,
  InitiateAuthCommand,
  ConfirmSignUpCommand,
  GetUserCommand,
} from "@aws-sdk/client-cognito-identity-provider";

const router = express.Router();

/* -------------------------------------------------------------
 * AWS Cognito Client Setup
 * ------------------------------------------------------------- */
const client = new CognitoIdentityProviderClient({
  region: process.env.COGNITO_REGION, // must be eu-north-1
});

const clientId = process.env.COGNITO_CLIENT_ID;
const clientSecret = process.env.COGNITO_CLIENT_SECRET;
const cognitoDomain = process.env.COGNITO_DOMAIN;
const redirectUri = process.env.COGNITO_REDIRECT_URI;

/* -------------------------------------------------------------
 * @route   GET /auth/login
 * @desc    Redirect to Cognito Hosted UI login
 * @access  Public
 * ------------------------------------------------------------- */
router.get("/login", (req, res) => {
  const url = `${cognitoDomain}/oauth2/authorize?redirect_uri=${encodeURIComponent(
    redirectUri
  )}&response_type=code&client_id=${clientId}&scope=openid+email+profile+aws.cognito.signin.user.admin`;
  res.redirect(url);
});

/* -------------------------------------------------------------
 * @route   GET /auth/callback
 * @desc    Handle Hosted UI login callback,
 *          exchange code for tokens, persist in DB
 * @access  Public
 * ------------------------------------------------------------- */
router.get("/callback", async (req, res) => {
  const { code } = req.query;
  if (!code) return res.status(400).json({ error: "Missing code" });

  try {

    // exchange code for tokens
    const tokenResponse = await axios.post(
      `${cognitoDomain}/oauth2/token`,
      new URLSearchParams({
        grant_type: "authorization_code",
        client_id: clientId,
        code,
        redirect_uri: redirectUri,
        ...(clientSecret && {
          client_secret: clientSecret, 
        }),
      }),
      { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
    );

    const { id_token, access_token, refresh_token } = tokenResponse.data;

    const payload = JSON.parse(
      Buffer.from(id_token.split(".")[1], "base64").toString("utf-8")
    );

    let user = await AppUser.findOne({ email: payload.email });
    if (!user) {
      user = new AppUser({
        name: payload.name || payload.email,
        email: payload.email,
        cognitoSub: payload.sub,
        cognitoUsername: payload["cognito:username"],
        cognitoStatus: "CONFIRMED",
      });
    }

    user.idToken = id_token;
    user.accessToken = access_token;
    user.refreshToken = refresh_token;
    await user.save();

    // Store user session
    req.userId = user._id;

    res.status(200).json({ user: user });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

/* -------------------------------------------------------------
 * @route   GET /auth/me
 * @desc    Get current logged-in user from session
 * @access  Private
 * ------------------------------------------------------------- */
router.get("/me", async (req, res) => {
  try {
    if (!req.session.userId) {
      return res.status(401).json({ error: "Not authenticated" });
    }

    const user = await AppUser.findById(req.session.userId).select(
      "-idToken -accessToken -refreshToken"
    );

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Fetch related accounts
    const metaUser = await MetaUser.find({ userId: user._id });
    const twitterUser = await TwitterUser.find({ userId: user._id });

    res.json({
      user,
      accounts: {
        meta: metaUser || null,
        twitter: twitterUser || null,
      },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


export default router;
