"use strict";

var _mongoose = _interopRequireDefault(require("mongoose"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
// models/stock.model.js

var TopStockSchema = new _mongoose["default"].Schema({
  symbol: {
    type: String,
    required: true,
    trim: true,
    uppercase: true,
    index: true
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  sector: {
    type: String,
    "default": null,
    trim: true
  },
  price: {
    type: Number,
    "default": null,
    min: 0
  },
  changePercent: {
    type: Number,
    "default": null
  },
  lastUpdatedAt: {
    type: Date,
    "default": Date.now
  }
}, {
  timestamps: true
});
TopStockSchema.index({
  symbol: 1,
  name: 1
}, {
  unique: true
});
module.exports = _mongoose["default"].model('TopStock', TopStockSchema);