"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _mongoose = _interopRequireDefault(require("mongoose"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}
_mongoose["default"].connect(process.env.MONGO_URI, {
  useNewUrlParser: true
  //useUnifiedTopology: true
}).then(function () {
  console.log("database connection on ".concat(process.env.MONGO_URI));
  // dropIndex('filepath_1');
})["catch"](function (error) {
  console.error('Error connecting to MongoDB:', error);
});
var _default = exports["default"] = _mongoose["default"];