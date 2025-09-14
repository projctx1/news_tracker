/**
 * File: AppUser.js
 * Desc: Mongoose schema for storing application users.
 */

import mongoose from "mongoose";

const AppUserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },

    // Cognito details
    cognitoSub: { type: String, required: true, unique: true }, // sub from AWS Cognito
    cognitoUsername: { type: String },
    cognitoStatus: { type: String },

    // Tokens
    idToken: { type: String },
    accessToken: { type: String },
    refreshToken: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model("AppUser", AppUserSchema);
