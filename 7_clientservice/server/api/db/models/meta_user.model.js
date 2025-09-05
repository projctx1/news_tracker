// models/metaUser.model.js
const mongoose = require("mongoose");

const metaUserSchema = new mongoose.Schema(
  {
    appUserId: {
      type: String,
      ref: "AppUser",
      required: true,
      unique: true,
    },
    userId: {
      type: String,
      required: true,
    },
    facebook: {
      userAccessToken: { type: String, required: true },
      refreshToken: { type: String },
      pages: [
        {
          pageId: { type: String, required: true },
          pageName: { type: String },
          pageAccessToken: { type: String, required: true },
        },
      ],
    },
    instagram: {
      igUserId: { type: String },
      username: { type: String },
    },
    tokenExpiry: { type: Date },
  },
  { timestamps: true }
);

module.exports = mongoose.model("MetaUser", metaUserSchema);
