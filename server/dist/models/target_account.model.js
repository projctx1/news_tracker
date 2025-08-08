"use strict";

// models/TargetAccount.js
var mongoose = require('mongoose');
var targetAccountSchema = new mongoose.Schema({
  author_username: {
    type: String,
    required: true
  }
});
module.exports = mongoose.model('TargetAccount', targetAccountSchema);