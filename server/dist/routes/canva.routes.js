"use strict";

function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
require("dotenv").config();
var express = require("express");
var session = require("express-session");
var axios = require("axios");
var crypto = require("crypto");
var fs = require("fs");
var path = require("path");
var mime = require("mime-types");
var querystring = require("querystring");
var canvaRoute = express.Router();

// ---- ENV ----
var CANVA_API_BASE = process.env.CANVA_API_BASE;
var CANVA_CLIENT_ID = process.env.CANVA_CLIENT_ID;
var CANVA_SECRET = process.env.CANVA_SECRET;
var CANVA_REDIRECT_URI = process.env.CANVA_REDIRECT_URI;
var dynamicAccessToken = process.env.CANVA_ACCESS_TOKEN || null;
var canvaAxios = function canvaAxios() {
  return axios.create({
    baseURL: CANVA_API_BASE,
    headers: {
      Authorization: "Bearer ".concat(dynamicAccessToken)
    }
  });
};
function generateCodeVerifier() {
  return crypto.randomBytes(32).toString("base64url");
}
function generateCodeChallenge(verifier) {
  return crypto.createHash("sha256").update(verifier).digest("base64url");
}
function generateState() {
  return crypto.randomBytes(16).toString("hex");
}
function pollJobStatus(_x) {
  return _pollJobStatus.apply(this, arguments);
}
function _pollJobStatus() {
  _pollJobStatus = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee5(url) {
    var interval,
      maxAttempts,
      attempts,
      _yield$canvaAxios$get,
      data,
      _args5 = arguments;
    return _regenerator().w(function (_context5) {
      while (1) switch (_context5.n) {
        case 0:
          interval = _args5.length > 1 && _args5[1] !== undefined ? _args5[1] : 2000;
          maxAttempts = _args5.length > 2 && _args5[2] !== undefined ? _args5[2] : 10;
          attempts = 0;
        case 1:
          if (!(attempts < maxAttempts)) {
            _context5.n = 6;
            break;
          }
          _context5.n = 2;
          return canvaAxios().get(url);
        case 2:
          _yield$canvaAxios$get = _context5.v;
          data = _yield$canvaAxios$get.data;
          if (!(data.status === "completed")) {
            _context5.n = 3;
            break;
          }
          return _context5.a(2, data);
        case 3:
          if (!(data.status === "failed")) {
            _context5.n = 4;
            break;
          }
          throw new Error("Job failed");
        case 4:
          _context5.n = 5;
          return new Promise(function (r) {
            return setTimeout(r, interval);
          });
        case 5:
          attempts++;
          _context5.n = 1;
          break;
        case 6:
          throw new Error("Polling timed out");
        case 7:
          return _context5.a(2);
      }
    }, _callee5);
  }));
  return _pollJobStatus.apply(this, arguments);
}
function requireAccessToken(req, res, next) {
  if (!dynamicAccessToken) {
    return res.status(401).json({
      error: "Not authorized. Start OAuth at GET /canva/auth"
    });
  }
  next();
}

/**
 * AUTH: Step 1 - Redirect user to Canva with PKCE
 */
canvaRoute.get("/auth", function (req, res) {
  if (!CANVA_CLIENT_ID || !CANVA_REDIRECT_URI) {
    return res.status(500).json({
      error: "Missing CANVA_CLIENT_ID or CANVA_REDIRECT_URI"
    });
  }
  var codeVerifier = generateCodeVerifier();
  var codeChallenge = generateCodeChallenge(codeVerifier);
  var state = generateState();
  req.session.oauthState = state;
  req.session.codeVerifier = codeVerifier;
  var authUrl = "https://www.canva.com/api/oauth/authorize?" + querystring.stringify({
    client_id: CANVA_CLIENT_ID,
    redirect_uri: CANVA_REDIRECT_URI,
    response_type: "code",
    scope: "asset:read asset:write app:read app:write brandtemplate:content:read brandtemplate:meta:read design:permission:read design:permission:write design:content:write design:content:read design:meta:read profile:read",
    code_challenge: codeChallenge,
    code_challenge_method: "S256",
    state: state
  });

  // Ensure session is saved BEFORE redirect so state/verifier persist
  req.session.save(function (err) {
    if (err) {
      console.error("Session save failed:", err);
      return res.status(500).json({
        error: "Session error"
      });
    }
    return res.redirect(authUrl);
  });
});

/**
 * AUTH: Step 2 - Callback from Canva
 */
canvaRoute.get("/auth/callback", /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(req, res) {
    var _req$query, code, state, codeVerifier, _yield$axios$post, data, _err$response, _err$response2, _t;
    return _regenerator().w(function (_context) {
      while (1) switch (_context.p = _context.n) {
        case 0:
          _req$query = req.query, code = _req$query.code, state = _req$query.state;
          if (!(!code || !state)) {
            _context.n = 1;
            break;
          }
          return _context.a(2, res.status(400).json({
            error: "Missing code or state"
          }));
        case 1:
          if (!(!req.session.oauthState || !req.session.codeVerifier)) {
            _context.n = 2;
            break;
          }
          return _context.a(2, res.status(400).json({
            error: "Session expired. Start OAuth again."
          }));
        case 2:
          if (!(state !== req.session.oauthState)) {
            _context.n = 3;
            break;
          }
          return _context.a(2, res.status(400).json({
            error: "State mismatch"
          }));
        case 3:
          codeVerifier = req.session.codeVerifier;
          delete req.session.oauthState;
          delete req.session.codeVerifier;
          _context.p = 4;
          _context.n = 5;
          return axios.post("https://www.canva.com/api/oauth/token", querystring.stringify({
            grant_type: "authorization_code",
            code: code,
            redirect_uri: CANVA_REDIRECT_URI,
            client_id: CANVA_CLIENT_ID,
            code_verifier: codeVerifier
          }), {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded"
            }
          });
        case 5:
          _yield$axios$post = _context.v;
          data = _yield$axios$post.data;
          dynamicAccessToken = data.access_token; // make subsequent API calls work
          // Optionally persist refresh_token here if returned (data.refresh_token)
          return _context.a(2, res.json({
            message: "OAuth success",
            token: data
          }));
        case 6:
          _context.p = 6;
          _t = _context.v;
          console.error("OAuth token exchange failed:", ((_err$response = _t.response) === null || _err$response === void 0 ? void 0 : _err$response.data) || _t.message);
          return _context.a(2, res.status(500).json({
            error: "OAuth failed",
            details: (_err$response2 = _t.response) === null || _err$response2 === void 0 ? void 0 : _err$response2.data
          }));
      }
    }, _callee, null, [[4, 6]]);
  }));
  return function (_x2, _x3) {
    return _ref.apply(this, arguments);
  };
}());

/**
 * Optional: logout/clear token
 */
canvaRoute.post("/auth/logout", function (req, res) {
  dynamicAccessToken = null;
  req.session.destroy(function () {
    return res.sendStatus(204);
  });
});

/**
 * Upload an asset (raw binary + metadata header)
 */
canvaRoute.post("/upload-asset", requireAccessToken, /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2(req, res) {
    var _req$body, filePath, assetName, ct, fileStream, _yield$canvaAxios$pos, data, jobId, result, _error$response, _error$response2, _t2;
    return _regenerator().w(function (_context2) {
      while (1) switch (_context2.p = _context2.n) {
        case 0:
          _context2.p = 0;
          _req$body = req.body, filePath = _req$body.filePath, assetName = _req$body.assetName;
          if (!(!filePath || !assetName)) {
            _context2.n = 1;
            break;
          }
          return _context2.a(2, res.status(400).json({
            error: "filePath and assetName are required"
          }));
        case 1:
          if (fs.existsSync(filePath)) {
            _context2.n = 2;
            break;
          }
          return _context2.a(2, res.status(400).json({
            error: "File not found at ".concat(filePath)
          }));
        case 2:
          ct = mime.lookup(filePath) || "application/octet-stream";
          fileStream = fs.createReadStream(path.resolve(filePath));
          _context2.n = 3;
          return canvaAxios().post("/asset-uploads", fileStream, {
            headers: {
              "Content-Type": ct,
              "Asset-Upload-Metadata": JSON.stringify({
                name: assetName,
                mime_type: ct
              })
            },
            maxBodyLength: Infinity
          });
        case 3:
          _yield$canvaAxios$pos = _context2.v;
          data = _yield$canvaAxios$pos.data;
          jobId = data.job_id;
          _context2.n = 4;
          return pollJobStatus("/asset-uploads/".concat(jobId));
        case 4:
          result = _context2.v;
          return _context2.a(2, res.json({
            asset_id: result.asset_id,
            job: result
          }));
        case 5:
          _context2.p = 5;
          _t2 = _context2.v;
          console.error("Upload error:", ((_error$response = _t2.response) === null || _error$response === void 0 ? void 0 : _error$response.data) || _t2.message);
          return _context2.a(2, res.status(500).json({
            error: _t2.message,
            details: (_error$response2 = _t2.response) === null || _error$response2 === void 0 ? void 0 : _error$response2.data
          }));
      }
    }, _callee2, null, [[0, 5]]);
  }));
  return function (_x4, _x5) {
    return _ref2.apply(this, arguments);
  };
}());

/**
 * Autofill a brand template
 */
canvaRoute.post("/autofill-template", requireAccessToken, /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3(req, res) {
    var _req$body2, brandTemplateId, dataObject, _yield$canvaAxios$pos2, data, jobId, result, _error$response3, _error$response4, _t3;
    return _regenerator().w(function (_context3) {
      while (1) switch (_context3.p = _context3.n) {
        case 0:
          _context3.p = 0;
          _req$body2 = req.body, brandTemplateId = _req$body2.brandTemplateId, dataObject = _req$body2.dataObject;
          if (!(!brandTemplateId || !dataObject)) {
            _context3.n = 1;
            break;
          }
          return _context3.a(2, res.status(400).json({
            error: "brandTemplateId and dataObject required"
          }));
        case 1:
          _context3.n = 2;
          return canvaAxios().post("/autofills", {
            brand_template_id: brandTemplateId,
            data: dataObject
          });
        case 2:
          _yield$canvaAxios$pos2 = _context3.v;
          data = _yield$canvaAxios$pos2.data;
          jobId = data.job_id;
          _context3.n = 3;
          return pollJobStatus("/autofills/".concat(jobId));
        case 3:
          result = _context3.v;
          return _context3.a(2, res.json({
            design_id: result.design_id,
            job: result
          }));
        case 4:
          _context3.p = 4;
          _t3 = _context3.v;
          console.error("Autofill error:", ((_error$response3 = _t3.response) === null || _error$response3 === void 0 ? void 0 : _error$response3.data) || _t3.message);
          return _context3.a(2, res.status(500).json({
            error: _t3.message,
            details: (_error$response4 = _t3.response) === null || _error$response4 === void 0 ? void 0 : _error$response4.data
          }));
      }
    }, _callee3, null, [[0, 4]]);
  }));
  return function (_x6, _x7) {
    return _ref3.apply(this, arguments);
  };
}());

/**
 * Export a design
 */
canvaRoute.post("/export-design", requireAccessToken, /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee4(req, res) {
    var _req$body3, designId, exportFormat, _yield$canvaAxios$pos3, data, jobId, result, _error$response5, _error$response6, _t4;
    return _regenerator().w(function (_context4) {
      while (1) switch (_context4.p = _context4.n) {
        case 0:
          _context4.p = 0;
          _req$body3 = req.body, designId = _req$body3.designId, exportFormat = _req$body3.exportFormat;
          if (!(!designId || !exportFormat)) {
            _context4.n = 1;
            break;
          }
          return _context4.a(2, res.status(400).json({
            error: "designId and exportFormat required"
          }));
        case 1:
          _context4.n = 2;
          return canvaAxios().post("/exports", {
            design_id: designId,
            format: exportFormat // "png" | "pdf" | "mp4" etc.
          });
        case 2:
          _yield$canvaAxios$pos3 = _context4.v;
          data = _yield$canvaAxios$pos3.data;
          jobId = data.job_id;
          _context4.n = 3;
          return pollJobStatus("/exports/".concat(jobId));
        case 3:
          result = _context4.v;
          return _context4.a(2, res.json({
            download_url: result.download_url,
            job: result
          }));
        case 4:
          _context4.p = 4;
          _t4 = _context4.v;
          console.error("Export error:", ((_error$response5 = _t4.response) === null || _error$response5 === void 0 ? void 0 : _error$response5.data) || _t4.message);
          return _context4.a(2, res.status(500).json({
            error: _t4.message,
            details: (_error$response6 = _t4.response) === null || _error$response6 === void 0 ? void 0 : _error$response6.data
          }));
      }
    }, _callee4, null, [[0, 4]]);
  }));
  return function (_x8, _x9) {
    return _ref4.apply(this, arguments);
  };
}());
module.exports = canvaRoute;