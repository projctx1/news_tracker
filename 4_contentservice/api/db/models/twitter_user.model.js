// models/TwitterUser.js
const mongoose = require('mongoose');

const TwitterUserSchema = new mongoose.Schema({
  username: { type: String, required: true },
  accountId: { type: String, required: true },
  accessToken: { type: String, required: true },
  accessSecret: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model('TwitterUser', TwitterUserSchema);
