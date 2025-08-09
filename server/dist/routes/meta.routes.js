"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _axios = _interopRequireDefault(require("axios"));
var _meta_userModel = _interopRequireDefault(require("../models/meta_user.model.js"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
require("dotenv").config();
var _process$env = process.env,
  META_APP_ID = _process$env.META_APP_ID,
  META_APP_SECRET = _process$env.META_APP_SECRET,
  META_REDIRECT_URI = _process$env.META_REDIRECT_URI;
var metaRoute = _express["default"].Router();

/**
 * Middleware to ensure a valid Meta (Facebook/Instagram) token.
 * - Refreshes if expired.
 * - Attaches `req.metaUser` and `req.accessToken`.
 */
function getValidToken(_x, _x2, _x3) {
  return _getValidToken.apply(this, arguments);
}
/**
 * Step 1: Redirect to Facebook OAuth
 */
function _getValidToken() {
  _getValidToken = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee9(req, res, next) {
    var userId, metaUser, now, token, refreshRes, expiresIn, newExpiryDate, _error$response9, _t9;
    return _regenerator().w(function (_context9) {
      while (1) switch (_context9.p = _context9.n) {
        case 0:
          userId = req.body.userId;
          if (userId) {
            _context9.n = 1;
            break;
          }
          return _context9.a(2, res.status(400).json({
            message: "Missing userId"
          }));
        case 1:
          _context9.p = 1;
          _context9.n = 2;
          return _meta_userModel["default"].findOne({
            userId: userId
          });
        case 2:
          metaUser = _context9.v;
          if (metaUser) {
            _context9.n = 3;
            break;
          }
          return _context9.a(2, res.status(404).json({
            message: "Meta user not found"
          }));
        case 3:
          now = new Date();
          token = metaUser.facebook.userAccessToken; // If token expired or will expire in next 5 mins, refresh
          if (!(!metaUser.tokenExpiry || metaUser.tokenExpiry <= new Date(now.getTime() + 5 * 60 * 1000))) {
            _context9.n = 6;
            break;
          }
          console.log("Refreshing token for user ".concat(userId, "..."));
          _context9.n = 4;
          return _axios["default"].get("https://graph.facebook.com/v21.0/oauth/access_token", {
            params: {
              grant_type: "fb_exchange_token",
              client_id: META_APP_ID,
              client_secret: META_APP_SECRET,
              fb_exchange_token: metaUser.facebook.refreshToken || token
            }
          });
        case 4:
          refreshRes = _context9.v;
          token = refreshRes.data.access_token;
          expiresIn = refreshRes.data.expires_in;
          newExpiryDate = new Date(now.getTime() + expiresIn * 1000); // Save refreshed token
          metaUser.facebook.userAccessToken = token;
          metaUser.facebook.refreshToken = token;
          metaUser.tokenExpiry = newExpiryDate;
          _context9.n = 5;
          return metaUser.save();
        case 5:
          console.log("Token refreshed. Expires at ".concat(newExpiryDate.toISOString()));
        case 6:
          // Attach to request for use in controllers
          req.metaUser = metaUser;
          req.accessToken = token;
          next();
          _context9.n = 8;
          break;
        case 7:
          _context9.p = 7;
          _t9 = _context9.v;
          console.error("Token middleware error:", ((_error$response9 = _t9.response) === null || _error$response9 === void 0 ? void 0 : _error$response9.data) || _t9.message);
          return _context9.a(2, res.status(500).json({
            message: "Failed to validate Meta token"
          }));
        case 8:
          return _context9.a(2);
      }
    }, _callee9, null, [[1, 7]]);
  }));
  return _getValidToken.apply(this, arguments);
}
metaRoute.get("/auth", function (req, res) {
  var authUrl = "https://www.facebook.com/v21.0/dialog/oauth?client_id=".concat(META_APP_ID, "&redirect_uri=").concat(encodeURIComponent(META_REDIRECT_URI), "&scope=pages_manage_posts,pages_read_engagement,pages_show_list,ads_management,instagram_basic,instagram_content_publish&response_type=code");
  res.redirect(authUrl);
});

/**
 * Step 2: Handle OAuth callback
 */
metaRoute.get("/auth/callback", /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(req, res) {
    var _req$query, code, userId, tokenRes, shortLivedToken, longTokenRes, longLivedToken, expiryDate, pagesRes, metaUser, _error$response, _t;
    return _regenerator().w(function (_context) {
      while (1) switch (_context.p = _context.n) {
        case 0:
          _req$query = req.query, code = _req$query.code, userId = _req$query.userId;
          _context.p = 1;
          _context.n = 2;
          return _axios["default"].get("https://graph.facebook.com/v21.0/oauth/access_token", {
            params: {
              client_id: META_APP_ID,
              client_secret: META_APP_SECRET,
              redirect_uri: META_REDIRECT_URI,
              code: code
            }
          });
        case 2:
          tokenRes = _context.v;
          shortLivedToken = tokenRes.data.access_token; // Exchange short-lived token for long-lived token
          _context.n = 3;
          return _axios["default"].get("https://graph.facebook.com/v21.0/oauth/access_token", {
            params: {
              grant_type: "fb_exchange_token",
              client_id: META_APP_ID,
              client_secret: META_APP_SECRET,
              fb_exchange_token: shortLivedToken
            }
          });
        case 3:
          longTokenRes = _context.v;
          longLivedToken = longTokenRes.data.access_token;
          expiryDate = new Date(Date.now() + longTokenRes.data.expires_in * 1000); // Get user pages
          _context.n = 4;
          return _axios["default"].get("https://graph.facebook.com/me/accounts?access_token=".concat(longLivedToken));
        case 4:
          pagesRes = _context.v;
          _context.n = 5;
          return _meta_userModel["default"].findOneAndUpdate({
            userId: userId
          }, {
            facebook: {
              userAccessToken: longLivedToken,
              refreshToken: longLivedToken,
              pages: pagesRes.data.data.map(function (p) {
                return {
                  pageId: p.id,
                  pageName: p.name,
                  pageAccessToken: p.access_token
                };
              })
            },
            tokenExpiry: expiryDate
          }, {
            upsert: true,
            "new": true
          });
        case 5:
          metaUser = _context.v;
          res.json({
            success: true,
            metaUser: metaUser
          });
          _context.n = 7;
          break;
        case 6:
          _context.p = 6;
          _t = _context.v;
          console.error(((_error$response = _t.response) === null || _error$response === void 0 ? void 0 : _error$response.data) || _t.message);
          res.status(500).json({
            message: "OAuth callback failed"
          });
        case 7:
          return _context.a(2);
      }
    }, _callee, null, [[1, 6]]);
  }));
  return function (_x4, _x5) {
    return _ref.apply(this, arguments);
  };
}());

/**
 * Connect Instagram account linked to the user's FB page
 * ensure you have connected your facebook page with your instagram page 
 * pass userId in the body parameter when calling this api
 */
metaRoute.post("/connect-instagram-page", /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2(req, res) {
    var userId, _metaUser$facebook, _igRes$data$instagram, metaUser, page, igRes, igBusinessAccountId, igDetailsRes, _error$response2, _t2;
    return _regenerator().w(function (_context2) {
      while (1) switch (_context2.p = _context2.n) {
        case 0:
          userId = req.body.userId;
          _context2.p = 1;
          _context2.n = 2;
          return _meta_userModel["default"].findOne({
            userId: userId
          });
        case 2:
          metaUser = _context2.v;
          if (metaUser) {
            _context2.n = 3;
            break;
          }
          return _context2.a(2, res.status(404).json({
            message: "Meta user not found"
          }));
        case 3:
          if ((_metaUser$facebook = metaUser.facebook) !== null && _metaUser$facebook !== void 0 && (_metaUser$facebook = _metaUser$facebook.pages) !== null && _metaUser$facebook !== void 0 && _metaUser$facebook.length) {
            _context2.n = 4;
            break;
          }
          return _context2.a(2, res.status(400).json({
            message: "No Facebook pages found for this user"
          }));
        case 4:
          // Use the first page (or let user pick)
          page = metaUser.facebook.pages[0]; // Step 1: Get Instagram Business Account ID linked to this FB page
          _context2.n = 5;
          return _axios["default"].get("https://graph.facebook.com/v21.0/".concat(page.pageId), {
            params: {
              fields: "instagram_business_account",
              access_token: page.pageAccessToken
            }
          });
        case 5:
          igRes = _context2.v;
          igBusinessAccountId = (_igRes$data$instagram = igRes.data.instagram_business_account) === null || _igRes$data$instagram === void 0 ? void 0 : _igRes$data$instagram.id;
          if (igBusinessAccountId) {
            _context2.n = 6;
            break;
          }
          return _context2.a(2, res.status(400).json({
            message: "No Instagram business account linked to this FB page"
          }));
        case 6:
          _context2.n = 7;
          return _axios["default"].get("https://graph.facebook.com/v21.0/".concat(igBusinessAccountId), {
            params: {
              fields: "username",
              access_token: page.pageAccessToken
            }
          });
        case 7:
          igDetailsRes = _context2.v;
          // Step 3: Update MetaUser with Instagram data
          metaUser.instagram = {
            igUserId: igBusinessAccountId,
            username: igDetailsRes.data.username
          };
          _context2.n = 8;
          return metaUser.save();
        case 8:
          res.json({
            success: true,
            message: "Instagram connected successfully",
            instagram: metaUser.instagram
          });
          _context2.n = 10;
          break;
        case 9:
          _context2.p = 9;
          _t2 = _context2.v;
          console.error(((_error$response2 = _t2.response) === null || _error$response2 === void 0 ? void 0 : _error$response2.data) || _t2.message);
          res.status(500).json({
            message: "Failed to connect Instagram"
          });
        case 10:
          return _context2.a(2);
      }
    }, _callee2, null, [[1, 9]]);
  }));
  return function (_x6, _x7) {
    return _ref2.apply(this, arguments);
  };
}());

/**
 * Create a Facebook Post
 */
metaRoute.post("/facebook", getValidToken, /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3(req, res) {
    var _req$body, userId, message, link, metaUser, pageToken, pageId, postUrl, postRes, _error$response3, _t3;
    return _regenerator().w(function (_context3) {
      while (1) switch (_context3.p = _context3.n) {
        case 0:
          _req$body = req.body, userId = _req$body.userId, message = _req$body.message, link = _req$body.link;
          _context3.p = 1;
          _context3.n = 2;
          return _meta_userModel["default"].findOne({
            userId: userId
          });
        case 2:
          metaUser = _context3.v;
          if (metaUser) {
            _context3.n = 3;
            break;
          }
          throw new Error("Meta user not found");
        case 3:
          pageToken = metaUser.facebook.pages[0].pageAccessToken;
          pageId = metaUser.facebook.pages[0].pageId;
          postUrl = "https://graph.facebook.com/".concat(pageId, "/feed");
          _context3.n = 4;
          return _axios["default"].post(postUrl, {
            message: message,
            link: link,
            access_token: pageToken
          });
        case 4:
          postRes = _context3.v;
          res.json({
            success: true,
            postId: postRes.data.id
          });
          _context3.n = 6;
          break;
        case 5:
          _context3.p = 5;
          _t3 = _context3.v;
          console.error(((_error$response3 = _t3.response) === null || _error$response3 === void 0 ? void 0 : _error$response3.data) || _t3.message);
          res.status(500).json({
            message: "Failed to create Facebook post"
          });
        case 6:
          return _context3.a(2);
      }
    }, _callee3, null, [[1, 5]]);
  }));
  return function (_x8, _x9) {
    return _ref3.apply(this, arguments);
  };
}());

/**
 * Create an Instagram Post
 */
metaRoute.post("/instagram", getValidToken, /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee4(req, res) {
    var _req$body2, userId, caption, imageUrl, metaUser, igUserId, pageToken, mediaRes, publishRes, _error$response4, _t4;
    return _regenerator().w(function (_context4) {
      while (1) switch (_context4.p = _context4.n) {
        case 0:
          _req$body2 = req.body, userId = _req$body2.userId, caption = _req$body2.caption, imageUrl = _req$body2.imageUrl;
          _context4.p = 1;
          _context4.n = 2;
          return _meta_userModel["default"].findOne({
            userId: userId
          });
        case 2:
          metaUser = _context4.v;
          if (!(!metaUser || !metaUser.instagram.igUserId)) {
            _context4.n = 3;
            break;
          }
          throw new Error("Instagram account not linked");
        case 3:
          igUserId = metaUser.instagram.igUserId;
          pageToken = metaUser.facebook.pages[0].pageAccessToken; // Step 1: Create media container
          _context4.n = 4;
          return _axios["default"].post("https://graph.facebook.com/".concat(igUserId, "/media"), {
            image_url: imageUrl,
            caption: caption,
            access_token: pageToken
          });
        case 4:
          mediaRes = _context4.v;
          _context4.n = 5;
          return _axios["default"].post("https://graph.facebook.com/".concat(igUserId, "/media_publish"), {
            creation_id: mediaRes.data.id,
            access_token: pageToken
          });
        case 5:
          publishRes = _context4.v;
          res.json({
            success: true,
            postId: publishRes.data.id
          });
          _context4.n = 7;
          break;
        case 6:
          _context4.p = 6;
          _t4 = _context4.v;
          console.error(((_error$response4 = _t4.response) === null || _error$response4 === void 0 ? void 0 : _error$response4.data) || _t4.message);
          res.status(500).json({
            message: "Failed to create Instagram post"
          });
        case 7:
          return _context4.a(2);
      }
    }, _callee4, null, [[1, 6]]);
  }));
  return function (_x0, _x1) {
    return _ref4.apply(this, arguments);
  };
}());

/**
 * Fetch all ads for a user
 */
metaRoute.get("/ads", getValidToken, /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee5(req, res) {
    var userId, META_AD_ACCOUNT_ID, accessToken, adsRes, _error$response5, _t5;
    return _regenerator().w(function (_context5) {
      while (1) switch (_context5.p = _context5.n) {
        case 0:
          userId = req.query.userId;
          META_AD_ACCOUNT_ID = process.env.META_AD_ACCOUNT_ID;
          _context5.p = 1;
          _context5.n = 2;
          return getValidToken(userId);
        case 2:
          accessToken = _context5.v;
          _context5.n = 3;
          return _axios["default"].get("https://graph.facebook.com/v21.0/".concat(META_AD_ACCOUNT_ID, "/ads"), {
            params: {
              access_token: accessToken,
              fields: "id,name,status,created_time,creative{id,name},adset{id,name},campaign{id,name}"
            }
          });
        case 3:
          adsRes = _context5.v;
          res.json({
            success: true,
            ads: adsRes.data.data
          });
          _context5.n = 5;
          break;
        case 4:
          _context5.p = 4;
          _t5 = _context5.v;
          console.error("Fetch Ads error:", ((_error$response5 = _t5.response) === null || _error$response5 === void 0 ? void 0 : _error$response5.data) || _t5.message);
          res.status(500).json({
            message: "Failed to fetch ads"
          });
        case 5:
          return _context5.a(2);
      }
    }, _callee5, null, [[1, 4]]);
  }));
  return function (_x10, _x11) {
    return _ref5.apply(this, arguments);
  };
}());

/**
 * Create an Advert (Facebook & Instagram)
 */
metaRoute.post("/advert", getValidToken, /*#__PURE__*/function () {
  var _ref6 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee6(req, res) {
    var _req$body3, userId, adName, adCreative, campaignName, dailyBudget, _process$env2, META_AD_ACCOUNT_ID, META_DEFAULT_OBJECTIVE, META_CURRENCY, metaUser, accessToken, campaignRes, adSetRes, creativeRes, adRes, _error$response6, _t6;
    return _regenerator().w(function (_context6) {
      while (1) switch (_context6.p = _context6.n) {
        case 0:
          _req$body3 = req.body, userId = _req$body3.userId, adName = _req$body3.adName, adCreative = _req$body3.adCreative, campaignName = _req$body3.campaignName, dailyBudget = _req$body3.dailyBudget;
          _process$env2 = process.env, META_AD_ACCOUNT_ID = _process$env2.META_AD_ACCOUNT_ID, META_DEFAULT_OBJECTIVE = _process$env2.META_DEFAULT_OBJECTIVE, META_CURRENCY = _process$env2.META_CURRENCY;
          _context6.p = 1;
          _context6.n = 2;
          return _meta_userModel["default"].findOne({
            userId: userId
          });
        case 2:
          metaUser = _context6.v;
          if (metaUser) {
            _context6.n = 3;
            break;
          }
          return _context6.a(2, res.status(404).json({
            message: "Meta user not found"
          }));
        case 3:
          _context6.n = 4;
          return getValidToken(userId);
        case 4:
          accessToken = _context6.v;
          _context6.n = 5;
          return _axios["default"].post("https://graph.facebook.com/v21.0/".concat(META_AD_ACCOUNT_ID, "/campaigns"), {
            name: campaignName,
            objective: META_DEFAULT_OBJECTIVE,
            status: "PAUSED"
          }, {
            params: {
              access_token: accessToken
            }
          });
        case 5:
          campaignRes = _context6.v;
          _context6.n = 6;
          return _axios["default"].post("https://graph.facebook.com/v21.0/".concat(META_AD_ACCOUNT_ID, "/adsets"), {
            name: "".concat(campaignName, " AdSet"),
            daily_budget: dailyBudget,
            billing_event: "IMPRESSIONS",
            optimization_goal: "REACH",
            campaign_id: campaignRes.data.id,
            targeting: {
              geo_locations: {
                countries: ["US"]
              }
            },
            status: "PAUSED",
            currency: META_CURRENCY
          }, {
            params: {
              access_token: accessToken
            }
          });
        case 6:
          adSetRes = _context6.v;
          _context6.n = 7;
          return _axios["default"].post("https://graph.facebook.com/v21.0/".concat(META_AD_ACCOUNT_ID, "/adcreatives"), {
            name: adName,
            object_story_spec: adCreative
          }, {
            params: {
              access_token: accessToken
            }
          });
        case 7:
          creativeRes = _context6.v;
          _context6.n = 8;
          return _axios["default"].post("https://graph.facebook.com/v21.0/".concat(META_AD_ACCOUNT_ID, "/ads"), {
            name: adName,
            adset_id: adSetRes.data.id,
            creative: {
              creative_id: creativeRes.data.id
            },
            status: "PAUSED"
          }, {
            params: {
              access_token: accessToken
            }
          });
        case 8:
          adRes = _context6.v;
          res.json({
            success: true,
            campaignId: campaignRes.data.id,
            adSetId: adSetRes.data.id,
            creativeId: creativeRes.data.id,
            adId: adRes.data.id
          });
          _context6.n = 10;
          break;
        case 9:
          _context6.p = 9;
          _t6 = _context6.v;
          console.error("Ad creation error:", ((_error$response6 = _t6.response) === null || _error$response6 === void 0 ? void 0 : _error$response6.data) || _t6.message);
          res.status(500).json({
            message: "Failed to create advert"
          });
        case 10:
          return _context6.a(2);
      }
    }, _callee6, null, [[1, 9]]);
  }));
  return function (_x12, _x13) {
    return _ref6.apply(this, arguments);
  };
}());

/**
 * Update an existing ad
 */
metaRoute.put("/ads/:adId", getValidToken, /*#__PURE__*/function () {
  var _ref7 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee7(req, res) {
    var _req$body4, userId, name, status, adId, accessToken, updateRes, _error$response7, _t7;
    return _regenerator().w(function (_context7) {
      while (1) switch (_context7.p = _context7.n) {
        case 0:
          _req$body4 = req.body, userId = _req$body4.userId, name = _req$body4.name, status = _req$body4.status;
          adId = req.params.adId;
          _context7.p = 1;
          _context7.n = 2;
          return getValidToken(userId);
        case 2:
          accessToken = _context7.v;
          _context7.n = 3;
          return _axios["default"].post("https://graph.facebook.com/v21.0/".concat(adId), _objectSpread(_objectSpread({}, name && {
            name: name
          }), status && {
            status: status
          }), {
            params: {
              access_token: accessToken
            }
          });
        case 3:
          updateRes = _context7.v;
          res.json({
            success: true,
            updated: updateRes.data
          });
          _context7.n = 5;
          break;
        case 4:
          _context7.p = 4;
          _t7 = _context7.v;
          console.error("Update Ad error:", ((_error$response7 = _t7.response) === null || _error$response7 === void 0 ? void 0 : _error$response7.data) || _t7.message);
          res.status(500).json({
            message: "Failed to update ad"
          });
        case 5:
          return _context7.a(2);
      }
    }, _callee7, null, [[1, 4]]);
  }));
  return function (_x14, _x15) {
    return _ref7.apply(this, arguments);
  };
}());

/**
 * Delete an ad
 */
metaRoute["delete"]("/ads/:adId", /*#__PURE__*/function () {
  var _ref8 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee8(req, res) {
    var userId, adId, accessToken, deleteRes, _error$response8, _t8;
    return _regenerator().w(function (_context8) {
      while (1) switch (_context8.p = _context8.n) {
        case 0:
          userId = req.body.userId;
          adId = req.params.adId;
          _context8.p = 1;
          _context8.n = 2;
          return getValidToken(userId);
        case 2:
          accessToken = _context8.v;
          _context8.n = 3;
          return _axios["default"]["delete"]("https://graph.facebook.com/v21.0/".concat(adId), {
            params: {
              access_token: accessToken
            }
          });
        case 3:
          deleteRes = _context8.v;
          res.json({
            success: true,
            deleted: deleteRes.data
          });
          _context8.n = 5;
          break;
        case 4:
          _context8.p = 4;
          _t8 = _context8.v;
          console.error("Delete Ad error:", ((_error$response8 = _t8.response) === null || _error$response8 === void 0 ? void 0 : _error$response8.data) || _t8.message);
          res.status(500).json({
            message: "Failed to delete ad"
          });
        case 5:
          return _context8.a(2);
      }
    }, _callee8, null, [[1, 4]]);
  }));
  return function (_x16, _x17) {
    return _ref8.apply(this, arguments);
  };
}());
var _default = exports["default"] = metaRoute;