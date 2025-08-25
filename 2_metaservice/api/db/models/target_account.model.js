// models/TargetAccount.js
const mongoose = require('mongoose');

const targetAccountSchema = new mongoose.Schema({
  author_username: { type: String, required: true }
});

module.exports = mongoose.model('TargetAccount', targetAccountSchema);