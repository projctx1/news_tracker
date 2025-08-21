"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
require('dotenv').config();
var express = require('express');
var axios = require('axios');
var bannerRoute = express.Router();
var fs = require('fs');
var path = require('path');
var MASTER_API_KEY = process.env.BANNERBEAR_PROJECT_API_KEY;
var PROJECT_ID = process.env.BANNERBEAR_PROJECT_ID;
var BASE_URL = 'https://api.bannerbear.com/v2';
var SYNC_BASE_URL = 'https://sync.api.bannerbear.com/v2';
function bannerbearFetch(_x) {
  return _bannerbearFetch.apply(this, arguments);
}
function _bannerbearFetch() {
  _bannerbearFetch = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee10(endpoint) {
    var options,
      sync,
      url,
      response,
      _error$response,
      _error$response2,
      _args10 = arguments,
      _t4;
    return _regenerator().w(function (_context10) {
      while (1) switch (_context10.p = _context10.n) {
        case 0:
          options = _args10.length > 1 && _args10[1] !== undefined ? _args10[1] : {};
          sync = _args10.length > 2 && _args10[2] !== undefined ? _args10[2] : false;
          url = "".concat(sync ? SYNC_BASE_URL : BASE_URL).concat(endpoint);
          _context10.p = 1;
          _context10.n = 2;
          return axios({
            url: url,
            method: options.method || 'GET',
            headers: _objectSpread({
              'Authorization': "Bearer ".concat(MASTER_API_KEY),
              'Content-Type': 'application/json'
            }, options.headers || {}),
            data: options.body || undefined,
            timeout: 60000
          });
        case 2:
          response = _context10.v;
          return _context10.a(2, {
            status: response.status,
            data: response.data
          });
        case 3:
          _context10.p = 3;
          _t4 = _context10.v;
          return _context10.a(2, {
            status: ((_error$response = _t4.response) === null || _error$response === void 0 ? void 0 : _error$response.status) || 500,
            data: ((_error$response2 = _t4.response) === null || _error$response2 === void 0 ? void 0 : _error$response2.data) || {
              error: _t4.message
            }
          });
      }
    }, _callee10, null, [[1, 3]]);
  }));
  return _bannerbearFetch.apply(this, arguments);
}
;

/**
 * Authentication and Account
 */
bannerRoute.get('/auth', /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(req, res) {
    var result;
    return _regenerator().w(function (_context) {
      while (1) switch (_context.n) {
        case 0:
          _context.n = 1;
          return bannerbearFetch('/auth');
        case 1:
          result = _context.v;
          res.status(result.status).json(result.data);
        case 2:
          return _context.a(2);
      }
    }, _callee);
  }));
  return function (_x2, _x3) {
    return _ref.apply(this, arguments);
  };
}());

/**
 * Templates
 */
bannerRoute.get('/templates', /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2(req, res) {
    var result;
    return _regenerator().w(function (_context2) {
      while (1) switch (_context2.n) {
        case 0:
          _context2.n = 1;
          return bannerbearFetch('/templates');
        case 1:
          result = _context2.v;
          res.status(result.status).json(result.data);
        case 2:
          return _context2.a(2);
      }
    }, _callee2);
  }));
  return function (_x4, _x5) {
    return _ref2.apply(this, arguments);
  };
}());
bannerRoute.get('/templates/:uid', /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3(req, res) {
    var result;
    return _regenerator().w(function (_context3) {
      while (1) switch (_context3.n) {
        case 0:
          _context3.n = 1;
          return bannerbearFetch("/templates/".concat(req.params.uid));
        case 1:
          result = _context3.v;
          res.status(result.status).json(result.data);
        case 2:
          return _context3.a(2);
      }
    }, _callee3);
  }));
  return function (_x6, _x7) {
    return _ref3.apply(this, arguments);
  };
}());

/**
 * Images
 */
bannerRoute.get('/images', /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee4(req, res) {
    var result;
    return _regenerator().w(function (_context4) {
      while (1) switch (_context4.n) {
        case 0:
          _context4.n = 1;
          return bannerbearFetch('/images');
        case 1:
          result = _context4.v;
          res.status(result.status).json(result.data);
        case 2:
          return _context4.a(2);
      }
    }, _callee4);
  }));
  return function (_x8, _x9) {
    return _ref4.apply(this, arguments);
  };
}());
bannerRoute.get('/images/:uid', /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee5(req, res) {
    var result;
    return _regenerator().w(function (_context5) {
      while (1) switch (_context5.n) {
        case 0:
          _context5.n = 1;
          return bannerbearFetch("/images/".concat(req.params.uid));
        case 1:
          result = _context5.v;
          res.status(result.status).json(result.data);
        case 2:
          return _context5.a(2);
      }
    }, _callee5);
  }));
  return function (_x0, _x1) {
    return _ref5.apply(this, arguments);
  };
}());
bannerRoute.get('/images/export/:uid', /*#__PURE__*/function () {
  var _ref6 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee6(req, res) {
    var _imageResult$data, imageResult, contentType, ext, imageUrl, fileName, savePath, imageResp, _t;
    return _regenerator().w(function (_context6) {
      while (1) switch (_context6.p = _context6.n) {
        case 0:
          _context6.p = 0;
          _context6.n = 1;
          return bannerbearFetch("/images/".concat(req.params.uid));
        case 1:
          imageResult = _context6.v;
          if (!(imageResult.status !== 200 || !((_imageResult$data = imageResult.data) !== null && _imageResult$data !== void 0 && _imageResult$data.image_url))) {
            _context6.n = 2;
            break;
          }
          return _context6.a(2, res.status(imageResult.status).json({
            error: 'Image not found or not ready.'
          }));
        case 2:
          contentType = (imageResp === null || imageResp === void 0 ? void 0 : imageResp.headers['content-type']) || 'image/png';
          ext = contentType.split('/')[1]; // e.g., "png" or "jpeg"
          imageUrl = imageResult.data.image_url;
          fileName = "".concat(req.params.uid, ".").concat(ext);
          savePath = path.join(__dirname, '../wwwroot/images', fileName);
          _context6.n = 3;
          return axios.get(imageUrl, {
            responseType: 'arraybuffer'
          });
        case 3:
          imageResp = _context6.v;
          fs.writeFileSync(savePath, imageResp.data);
          res.json({
            uid: req.params.uid,
            fileName: fileName,
            savedPath: savePath,
            message: 'Image saved successfully!'
          });
          _context6.n = 5;
          break;
        case 4:
          _context6.p = 4;
          _t = _context6.v;
          res.status(500).json({
            error: _t.message
          });
        case 5:
          return _context6.a(2);
      }
    }, _callee6, null, [[0, 4]]);
  }));
  return function (_x10, _x11) {
    return _ref6.apply(this, arguments);
  };
}());
bannerRoute.post('/generate-image', /*#__PURE__*/function () {
  var _ref7 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee7(req, res) {
    var _req$body, template, modifications, render_pdf, transparent, metadata, payload, result;
    return _regenerator().w(function (_context7) {
      while (1) switch (_context7.n) {
        case 0:
          _req$body = req.body, template = _req$body.template, modifications = _req$body.modifications, render_pdf = _req$body.render_pdf, transparent = _req$body.transparent, metadata = _req$body.metadata;
          payload = _objectSpread(_objectSpread(_objectSpread(_objectSpread({
            template: template,
            modifications: modifications
          }, render_pdf !== undefined ? {
            render_pdf: render_pdf
          } : {}), transparent !== undefined ? {
            transparent: transparent
          } : {}), metadata !== undefined ? {
            metadata: metadata
          } : {}), {}, {
            project_id: PROJECT_ID
          });
          _context7.n = 1;
          return bannerbearFetch('/images', {
            method: 'POST',
            body: payload
          }, true);
        case 1:
          result = _context7.v;
          // sync mode

          res.status(result.status).json(result.data);
        case 2:
          return _context7.a(2);
      }
    }, _callee7);
  }));
  return function (_x12, _x13) {
    return _ref7.apply(this, arguments);
  };
}());

/**
 * Videos
 */
bannerRoute.get('/videos', /*#__PURE__*/function () {
  var _ref8 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee8(req, res) {
    var result;
    return _regenerator().w(function (_context8) {
      while (1) switch (_context8.n) {
        case 0:
          _context8.n = 1;
          return bannerbearFetch('/videos');
        case 1:
          result = _context8.v;
          res.status(result.status).json(result.data);
        case 2:
          return _context8.a(2);
      }
    }, _callee8);
  }));
  return function (_x14, _x15) {
    return _ref8.apply(this, arguments);
  };
}());
bannerRoute.get('/videos/:uid', /*#__PURE__*/function () {
  var _ref9 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee9(req, res) {
    var result;
    return _regenerator().w(function (_context9) {
      while (1) switch (_context9.n) {
        case 0:
          _context9.n = 1;
          return bannerbearFetch("/videos/".concat(req.params.uid));
        case 1:
          result = _context9.v;
          res.status(result.status).json(result.data);
        case 2:
          return _context9.a(2);
      }
    }, _callee9);
  }));
  return function (_x16, _x17) {
    return _ref9.apply(this, arguments);
  };
}());
bannerRoute.post('/generate-video', /*#__PURE__*/function () {
  var _ref0 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee0(req, res) {
    var _req$body2, video_template, _req$body2$template, template, modifications, input_media_url, webhook_url, metadata, payload, result, _t2;
    return _regenerator().w(function (_context0) {
      while (1) switch (_context0.p = _context0.n) {
        case 0:
          _context0.p = 0;
          _req$body2 = req.body, video_template = _req$body2.video_template, _req$body2$template = _req$body2.template, template = _req$body2$template === void 0 ? null : _req$body2$template, modifications = _req$body2.modifications, input_media_url = _req$body2.input_media_url, webhook_url = _req$body2.webhook_url, metadata = _req$body2.metadata; // Use video_template if present, else template
          payload = _objectSpread(_objectSpread(_objectSpread(_objectSpread({
            video_template: video_template || template,
            modifications: modifications
          }, input_media_url ? {
            input_media_url: input_media_url
          } : {}), webhook_url !== undefined ? {
            webhook_url: webhook_url
          } : {}), metadata !== undefined ? {
            metadata: metadata
          } : {}), {}, {
            project_id: PROJECT_ID
          });
          _context0.n = 1;
          return bannerbearFetch('/videos', {
            method: 'POST',
            body: payload
          });
        case 1:
          result = _context0.v;
          res.status(result.status).json(result.data);
          _context0.n = 3;
          break;
        case 2:
          _context0.p = 2;
          _t2 = _context0.v;
          res.status(500).json({
            error: _t2.message
          });
        case 3:
          return _context0.a(2);
      }
    }, _callee0, null, [[0, 2]]);
  }));
  return function (_x18, _x19) {
    return _ref0.apply(this, arguments);
  };
}());
bannerRoute.get('/videos/export/:uid', /*#__PURE__*/function () {
  var _ref1 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee1(req, res) {
    var _videoResult$data, videoResult, videoUrl, videoResp, contentType, ext, saveDir, fileName, savePath, _t3;
    return _regenerator().w(function (_context1) {
      while (1) switch (_context1.p = _context1.n) {
        case 0:
          _context1.p = 0;
          _context1.n = 1;
          return bannerbearFetch("/videos/".concat(req.params.uid));
        case 1:
          videoResult = _context1.v;
          if (!(videoResult.status !== 200 || !((_videoResult$data = videoResult.data) !== null && _videoResult$data !== void 0 && _videoResult$data.video_url))) {
            _context1.n = 2;
            break;
          }
          return _context1.a(2, res.status(videoResult.status).json({
            error: 'Video not found or not ready.'
          }));
        case 2:
          videoUrl = videoResult.data.video_url;
          _context1.n = 3;
          return axios.get(videoUrl, {
            responseType: 'arraybuffer'
          });
        case 3:
          videoResp = _context1.v;
          contentType = videoResp.headers['content-type'] || 'video/mp4';
          ext = contentType.split('/')[1]; // e.g., "mp4", "mov"
          saveDir = path.join(__dirname, '../wwwroot/videos');
          if (!fs.existsSync(saveDir)) fs.mkdirSync(saveDir, {
            recursive: true
          });
          fileName = "".concat(req.params.uid, ".").concat(ext);
          savePath = path.join(saveDir, fileName);
          fs.writeFileSync(savePath, videoResp.data);
          res.json({
            uid: req.params.uid,
            fileName: fileName,
            savedPath: savePath,
            message: 'Video saved successfully!'
          });
          _context1.n = 5;
          break;
        case 4:
          _context1.p = 4;
          _t3 = _context1.v;
          res.status(500).json({
            error: _t3.message
          });
        case 5:
          return _context1.a(2);
      }
    }, _callee1, null, [[0, 4]]);
  }));
  return function (_x20, _x21) {
    return _ref1.apply(this, arguments);
  };
}());
module.exports = bannerRoute;