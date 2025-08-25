"use strict";

var mongoose = require('mongoose');
var ScrappedDataFileSchema = new mongoose.Schema({
  urlSource: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ScraperURL',
    required: true
  },
  url: {
    type: String,
    required: [true, 'url is required'],
    unique: true,
    trim: true
  },
  subLinks: [{
    text: {
      type: String,
      "default": ''
    },
    href: {
      type: String,
      required: true,
      trim: true
    }
  }]
}, {
  timestamps: true
});
var ScrappedDataFile = mongoose.model('ScrappedFile', ScrappedDataFileSchema);
module.exports = ScrappedDataFile;