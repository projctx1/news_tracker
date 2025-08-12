"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
require('dotenv').config();
var express = require('express');
var axios = require('axios');
var FormData = require('form-data');
var fs = require('fs');
var canvaRoute = express.Router();
var CANVA_API_BASE = process.env.CANVA_API_BASE || 'https://api.canva.com/v1';
var CANVA_ACCESS_TOKEN = process.env.CANVA_ACCESS_TOKEN;
var canvaAxios = axios.create({
  baseURL: CANVA_API_BASE,
  headers: {
    Authorization: "Bearer ".concat(CANVA_ACCESS_TOKEN)
  }
});

/**
 * Helper: Poll job status
 * @param {*} url 
 * @param {*} interval 
 * @param {*} maxAttempts 
 * @returns 
 */
function pollJobStatus(_x) {
  return _pollJobStatus.apply(this, arguments);
}
/**
 * Post to upload asset
 */
function _pollJobStatus() {
  _pollJobStatus = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee4(url) {
    var interval,
      maxAttempts,
      attempts,
      response,
      data,
      _args4 = arguments;
    return _regenerator().w(function (_context4) {
      while (1) switch (_context4.n) {
        case 0:
          interval = _args4.length > 1 && _args4[1] !== undefined ? _args4[1] : 2000;
          maxAttempts = _args4.length > 2 && _args4[2] !== undefined ? _args4[2] : 10;
          attempts = 0;
        case 1:
          if (!(attempts < maxAttempts)) {
            _context4.n = 6;
            break;
          }
          _context4.n = 2;
          return canvaAxios.get(url);
        case 2:
          response = _context4.v;
          data = response.data;
          if (!(data.status === 'completed')) {
            _context4.n = 3;
            break;
          }
          return _context4.a(2, data);
        case 3:
          if (!(data.status === 'failed')) {
            _context4.n = 4;
            break;
          }
          throw new Error('Job failed');
        case 4:
          _context4.n = 5;
          return new Promise(function (r) {
            return setTimeout(r, interval);
          });
        case 5:
          attempts++;
          _context4.n = 1;
          break;
        case 6:
          throw new Error('Polling timed out');
        case 7:
          return _context4.a(2);
      }
    }, _callee4);
  }));
  return _pollJobStatus.apply(this, arguments);
}
canvaRoute.post('/upload-asset', /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(req, res) {
    var _req$body, filePath, assetName, fileBuffer, formData, uploadResponse, jobId, jobResult, _t;
    return _regenerator().w(function (_context) {
      while (1) switch (_context.p = _context.n) {
        case 0:
          _context.p = 0;
          // Expecting req.body to contain: filePath, assetName
          // In production, replace this with actual file upload handling
          _req$body = req.body, filePath = _req$body.filePath, assetName = _req$body.assetName;
          if (!(!filePath || !assetName)) {
            _context.n = 1;
            break;
          }
          return _context.a(2, res.status(400).json({
            error: 'filePath and assetName are required'
          }));
        case 1:
          // Read file buffer
          fileBuffer = fs.readFileSync(filePath); // Build FormData for the upload
          formData = new FormData();
          formData.append('file', fileBuffer, assetName);

          // Send POST /v1/asset-uploads with metadata header
          _context.n = 2;
          return canvaAxios.post('/asset-uploads', fileBuffer, {
            headers: _objectSpread(_objectSpread({}, formData.getHeaders()), {}, {
              'Asset-Upload-Metadata': JSON.stringify({
                name: assetName
              })
            })
          });
        case 2:
          uploadResponse = _context.v;
          jobId = uploadResponse.data.job_id; // Poll for completion
          _context.n = 3;
          return pollJobStatus("/asset-uploads/".concat(jobId));
        case 3:
          jobResult = _context.v;
          res.json({
            asset_id: jobResult.asset_id
          });
          _context.n = 5;
          break;
        case 4:
          _context.p = 4;
          _t = _context.v;
          res.status(500).json({
            error: _t.message
          });
        case 5:
          return _context.a(2);
      }
    }, _callee, null, [[0, 4]]);
  }));
  return function (_x2, _x3) {
    return _ref.apply(this, arguments);
  };
}());

/**
 * 2. Autofill a brand template
 * req.body should have: brandTemplateId, 
 * dataObjectdataObject maps field names to values, e.g. { image1: 'asset_id', text1: 'Hello' }
 */
canvaRoute.post('/autofill-template', /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2(req, res) {
    var _req$body2, brandTemplateId, dataObject, autofillResponse, jobId, jobResult, _t2;
    return _regenerator().w(function (_context2) {
      while (1) switch (_context2.p = _context2.n) {
        case 0:
          _context2.p = 0;
          _req$body2 = req.body, brandTemplateId = _req$body2.brandTemplateId, dataObject = _req$body2.dataObject;
          if (!(!brandTemplateId || !dataObject)) {
            _context2.n = 1;
            break;
          }
          return _context2.a(2, res.status(400).json({
            error: 'brandTemplateId and dataObject required'
          }));
        case 1:
          _context2.n = 2;
          return canvaAxios.post('/autofills', {
            brand_template_id: brandTemplateId,
            data: dataObject
          });
        case 2:
          autofillResponse = _context2.v;
          jobId = autofillResponse.data.job_id; // Poll for completion
          _context2.n = 3;
          return pollJobStatus("/autofills/".concat(jobId));
        case 3:
          jobResult = _context2.v;
          res.json({
            design_id: jobResult.design_id
          });
          _context2.n = 5;
          break;
        case 4:
          _context2.p = 4;
          _t2 = _context2.v;
          res.status(500).json({
            error: _t2.message
          });
        case 5:
          return _context2.a(2);
      }
    }, _callee2, null, [[0, 4]]);
  }));
  return function (_x4, _x5) {
    return _ref2.apply(this, arguments);
  };
}());

/**
 * 3. Export a design
 *  req.body should have: designId, exportFormat (png, pdf, mp4)
 */
canvaRoute.post('/export-design', /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3(req, res) {
    var _req$body3, designId, exportFormat, exportResponse, jobId, jobResult, _t3;
    return _regenerator().w(function (_context3) {
      while (1) switch (_context3.p = _context3.n) {
        case 0:
          _context3.p = 0;
          _req$body3 = req.body, designId = _req$body3.designId, exportFormat = _req$body3.exportFormat;
          if (!(!designId || !exportFormat)) {
            _context3.n = 1;
            break;
          }
          return _context3.a(2, res.status(400).json({
            error: 'designId and exportFormat required'
          }));
        case 1:
          _context3.n = 2;
          return canvaAxios.post('/exports', {
            design_id: designId,
            format: exportFormat
          });
        case 2:
          exportResponse = _context3.v;
          jobId = exportResponse.data.job_id; // Poll export status
          _context3.n = 3;
          return pollJobStatus("/exports/".concat(jobId));
        case 3:
          jobResult = _context3.v;
          // Return the download URL or file info
          res.json({
            download_url: jobResult.download_url
          });
          _context3.n = 5;
          break;
        case 4:
          _context3.p = 4;
          _t3 = _context3.v;
          res.status(500).json({
            error: _t3.message
          });
        case 5:
          return _context3.a(2);
      }
    }, _callee3, null, [[0, 4]]);
  }));
  return function (_x6, _x7) {
    return _ref3.apply(this, arguments);
  };
}());
module.exports = canvaRoute;