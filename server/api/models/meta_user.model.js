// models/metaUser.model.js
const mongoose = require("mongoose");

const metaUserSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
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
