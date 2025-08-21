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
/*****************************************************
 * META AUTH
****************************************************
*/
/**
 * Step 1: Redirect to Facebook OAuth
 */
function _getValidToken() {
  _getValidToken = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee18(req, res, next) {
    var userId, _metaUser16, now, token, refreshRes, expiresIn, newExpiryDate, _error$response18, _t18;
    return _regenerator().w(function (_context18) {
      while (1) switch (_context18.p = _context18.n) {
        case 0:
          userId = req.body.userId;
          if (userId) {
            _context18.n = 1;
            break;
          }
          return _context18.a(2, res.status(400).json({
            message: "Missing userId"
          }));
        case 1:
          _context18.p = 1;
          _context18.n = 2;
          return _meta_userModel["default"].findOne({
            userId: userId
          });
        case 2:
          _metaUser16 = _context18.v;
          if (_metaUser16) {
            _context18.n = 3;
            break;
          }
          return _context18.a(2, res.status(404).json({
            message: "Meta user not found"
          }));
        case 3:
          now = new Date();
          token = _metaUser16.facebook.userAccessToken; // If token expired or will expire in next 5 mins, refresh
          if (!(!_metaUser16.tokenExpiry || _metaUser16.tokenExpiry <= new Date(now.getTime() + 5 * 60 * 1000))) {
            _context18.n = 6;
            break;
          }
          console.log("Refreshing token for user ".concat(userId, "..."));
          _context18.n = 4;
          return _axios["default"].get("https://graph.facebook.com/v18.0/oauth/access_token", {
            params: {
              grant_type: "fb_exchange_token",
              client_id: META_APP_ID,
              client_secret: META_APP_SECRET,
              fb_exchange_token: _metaUser16.facebook.refreshToken || token
            }
          });
        case 4:
          refreshRes = _context18.v;
          token = refreshRes.data.access_token;
          expiresIn = refreshRes.data.expires_in;
          newExpiryDate = new Date(now.getTime() + expiresIn * 1000); // Save refreshed token
          _metaUser16.facebook.userAccessToken = token;
          _metaUser16.facebook.refreshToken = token;
          _metaUser16.tokenExpiry = newExpiryDate;
          _context18.n = 5;
          return _metaUser16.save();
        case 5:
          console.log("Token refreshed. Expires at ".concat(newExpiryDate.toISOString()));
        case 6:
          // Attach to request for use in controllers
          req.metaUser = _metaUser16;
          req.accessToken = token;
          next();
          _context18.n = 8;
          break;
        case 7:
          _context18.p = 7;
          _t18 = _context18.v;
          console.error("Token middleware error:", ((_error$response18 = _t18.response) === null || _error$response18 === void 0 ? void 0 : _error$response18.data) || _t18.message);
          return _context18.a(2, res.status(500).json({
            message: "Failed to validate Meta token"
          }));
        case 8:
          return _context18.a(2);
      }
    }, _callee18, null, [[1, 7]]);
  }));
  return _getValidToken.apply(this, arguments);
}
metaRoute.get("/auth", function (req, res) {
  var authUrl = "https://www.facebook.com/v18.0/dialog/oauth?client_id=".concat(META_APP_ID, "&redirect_uri=").concat(encodeURIComponent(META_REDIRECT_URI), "&scope=pages_manage_posts,pages_read_engagement,pages_show_list,ads_management,instagram_basic,instagram_content_publish,instagram_manage_comments&response_type=code");
  res.redirect(authUrl);
});

/**
 * Step 2: Handle OAuth callback
 */
metaRoute.get("/auth/callback", /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(req, res) {
    var code, tokenRes, shortLivedToken, longTokenRes, longLivedToken, expiryDate, meRes, metaUserId, pagesRes, pages, _metaUser, _error$response, _t;
    return _regenerator().w(function (_context) {
      while (1) switch (_context.p = _context.n) {
        case 0:
          code = req.query.code; // no userId in query anymore
          _context.p = 1;
          _context.n = 2;
          return _axios["default"].get("https://graph.facebook.com/v18.0/oauth/access_token", {
            params: {
              client_id: META_APP_ID,
              client_secret: META_APP_SECRET,
              redirect_uri: META_REDIRECT_URI,
              code: code
            }
          });
        case 2:
          tokenRes = _context.v;
          shortLivedToken = tokenRes.data.access_token;
          if (shortLivedToken) {
            _context.n = 3;
            break;
          }
          throw new Error("No short-lived token returned from Facebook");
        case 3:
          _context.n = 4;
          return _axios["default"].get("https://graph.facebook.com/v18.0/oauth/access_token", {
            params: {
              grant_type: "fb_exchange_token",
              client_id: META_APP_ID,
              client_secret: META_APP_SECRET,
              fb_exchange_token: shortLivedToken
            }
          });
        case 4:
          longTokenRes = _context.v;
          longLivedToken = longTokenRes.data.access_token;
          if (longLivedToken) {
            _context.n = 5;
            break;
          }
          throw new Error("No long-lived token returned from Facebook");
        case 5:
          if (longTokenRes.data.expires_in && !isNaN(longTokenRes.data.expires_in)) {
            expiryDate = new Date(Date.now() + longTokenRes.data.expires_in * 1000);
          } else {
            expiryDate = new Date("9999-12-31");
          }

          // Get Facebook user ID from /me endpoint
          _context.n = 6;
          return _axios["default"].get("https://graph.facebook.com/me", {
            params: {
              access_token: longLivedToken,
              fields: "id,name"
            }
          });
        case 6:
          meRes = _context.v;
          metaUserId = meRes.data.id;
          if (metaUserId) {
            _context.n = 7;
            break;
          }
          throw new Error("Could not retrieve Facebook user ID from /me");
        case 7:
          _context.n = 8;
          return _axios["default"].get("https://graph.facebook.com/me/accounts", {
            params: {
              access_token: longLivedToken
            }
          });
        case 8:
          pagesRes = _context.v;
          pages = Array.isArray(pagesRes.data.data) ? pagesRes.data.data.map(function (p) {
            return {
              pageId: p.id,
              pageName: p.name,
              pageAccessToken: p.access_token
            };
          }) : []; // Create or update MetaUser in DB using Facebook user ID as unique userId
          _context.n = 9;
          return _meta_userModel["default"].findOneAndUpdate({
            userId: metaUserId
          },
          // userId is Facebook user ID string
          {
            facebook: {
              userAccessToken: longLivedToken,
              refreshToken: longLivedToken,
              pages: pages
            },
            tokenExpiry: expiryDate
          }, {
            upsert: true,
            "new": true
          });
        case 9:
          _metaUser = _context.v;
          // Return response
          res.json({
            success: true,
            metaUser: _metaUser
          });
          _context.n = 11;
          break;
        case 10:
          _context.p = 10;
          _t = _context.v;
          console.error("OAuth callback error:", ((_error$response = _t.response) === null || _error$response === void 0 ? void 0 : _error$response.data) || _t.message);
          res.status(500).json({
            message: "OAuth callback failed"
          });
        case 11:
          return _context.a(2);
      }
    }, _callee, null, [[1, 10]]);
  }));
  return function (_x4, _x5) {
    return _ref.apply(this, arguments);
  };
}());

/**
 * Connect Instagram account linked to the user's FB page
 * ensure you have connected your facebook page with your instagram page 
 * pass userId in the body parameter when calling this api
 * This api must be called before trying to post
 */
metaRoute.post("/connect-instagram-page", /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2(req, res) {
    var userId, _metaUser2$facebook, _igRes$data$instagram, _metaUser2, page, igRes, igBusinessAccountId, igDetailsRes, _error$response2, _t2;
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
          _metaUser2 = _context2.v;
          if (_metaUser2) {
            _context2.n = 3;
            break;
          }
          return _context2.a(2, res.status(404).json({
            message: "Meta user not found"
          }));
        case 3:
          if ((_metaUser2$facebook = _metaUser2.facebook) !== null && _metaUser2$facebook !== void 0 && (_metaUser2$facebook = _metaUser2$facebook.pages) !== null && _metaUser2$facebook !== void 0 && _metaUser2$facebook.length) {
            _context2.n = 4;
            break;
          }
          return _context2.a(2, res.status(400).json({
            message: "No Facebook pages found for this user"
          }));
        case 4:
          // Use the first page (or let user pick)
          page = _metaUser2.facebook.pages[0]; // Step 1: Get Instagram Business Account ID linked to this FB page
          _context2.n = 5;
          return _axios["default"].get("https://graph.facebook.com/v18.0/".concat(page.pageId), {
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
          return _axios["default"].get("https://graph.facebook.com/v18.0/".concat(igBusinessAccountId), {
            params: {
              fields: "username",
              access_token: page.pageAccessToken
            }
          });
        case 7:
          igDetailsRes = _context2.v;
          // Step 3: Update MetaUser with Instagram data
          _metaUser2.instagram = {
            igUserId: igBusinessAccountId,
            username: igDetailsRes.data.username
          };
          _context2.n = 8;
          return _metaUser2.save();
        case 8:
          res.json({
            success: true,
            message: "Instagram connected successfully",
            instagram: _metaUser2.instagram
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

/*****************************************************
 * FACEBOOK ROUTES
****************************************************
*/

/**
 * List Posts on a Facebook Page
 */
metaRoute.get("/facebook/posts", /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3(req, res) {
    var _req$query, userId, _req$query$limit, limit, _req$query$after, after, _req$query$before, before, _metaUser3, pageToken, pageId, params, postsUrl, postsRes, _error$response3, _t3;
    return _regenerator().w(function (_context3) {
      while (1) switch (_context3.p = _context3.n) {
        case 0:
          _req$query = req.query, userId = _req$query.userId, _req$query$limit = _req$query.limit, limit = _req$query$limit === void 0 ? 10 : _req$query$limit, _req$query$after = _req$query.after, after = _req$query$after === void 0 ? null : _req$query$after, _req$query$before = _req$query.before, before = _req$query$before === void 0 ? null : _req$query$before;
          _context3.p = 1;
          _context3.n = 2;
          return _meta_userModel["default"].findOne({
            userId: userId
          });
        case 2:
          _metaUser3 = _context3.v;
          if (_metaUser3) {
            _context3.n = 3;
            break;
          }
          throw new Error("Meta user not found");
        case 3:
          pageToken = _metaUser3.facebook.pages[0].pageAccessToken;
          pageId = _metaUser3.facebook.pages[0].pageId;
          params = {
            access_token: pageToken,
            fields: "id,message,created_time,permalink_url",
            limit: limit
          };
          if (after) params.after = after;
          if (before) params.before = before;
          postsUrl = "https://graph.facebook.com/".concat(pageId, "/posts");
          _context3.n = 4;
          return _axios["default"].get(postsUrl, {
            params: params
          });
        case 4:
          postsRes = _context3.v;
          res.json({
            success: true,
            posts: postsRes.data.data,
            paging: postsRes.data.paging || null
          });
          _context3.n = 6;
          break;
        case 5:
          _context3.p = 5;
          _t3 = _context3.v;
          console.error(((_error$response3 = _t3.response) === null || _error$response3 === void 0 ? void 0 : _error$response3.data) || _t3.message);
          res.status(500).json({
            message: "Failed to fetch Facebook posts"
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
 * Create a Facebook Post
 */
metaRoute.post("/facebook/text/create", getValidToken, /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee4(req, res) {
    var _req$body, userId, message, link, _metaUser4, pageToken, pageId, postUrl, postRes, _error$response4, _t4;
    return _regenerator().w(function (_context4) {
      while (1) switch (_context4.p = _context4.n) {
        case 0:
          _req$body = req.body, userId = _req$body.userId, message = _req$body.message, link = _req$body.link;
          _context4.p = 1;
          _context4.n = 2;
          return _meta_userModel["default"].findOne({
            userId: userId
          });
        case 2:
          _metaUser4 = _context4.v;
          if (_metaUser4) {
            _context4.n = 3;
            break;
          }
          throw new Error("Meta user not found");
        case 3:
          pageToken = _metaUser4.facebook.pages[0].pageAccessToken;
          pageId = _metaUser4.facebook.pages[0].pageId;
          postUrl = "https://graph.facebook.com/".concat(pageId, "/feed");
          _context4.n = 4;
          return _axios["default"].post(postUrl, {
            message: message,
            link: link,
            access_token: pageToken
          });
        case 4:
          postRes = _context4.v;
          res.json({
            success: true,
            postId: postRes.data.id
          });
          _context4.n = 6;
          break;
        case 5:
          _context4.p = 5;
          _t4 = _context4.v;
          console.error(((_error$response4 = _t4.response) === null || _error$response4 === void 0 ? void 0 : _error$response4.data) || _t4.message);
          res.status(500).json({
            message: "Failed to create Facebook post"
          });
        case 6:
          return _context4.a(2);
      }
    }, _callee4, null, [[1, 5]]);
  }));
  return function (_x0, _x1) {
    return _ref4.apply(this, arguments);
  };
}());

/**
 * Upload a Video to Facebook Page
 * 
 * Facebook video upload requirements 
    Maximum file size: 100 MB 

    Maximum video length: 20 minutes

    Recommended formats: MP4 or MOV

    Upload method: Simple upload (direct file URL or multipart upload, ≤ 100 MB)

    Required permissions:

        pages_manage_posts

        pages_read_engagement

        Valid Page Access Token
 */
metaRoute.post("/facebook/video/create", getValidToken, /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee5(req, res) {
    var _req$body2, userId, videoUrl, title, description, _metaUser5, pageToken, pageId, uploadUrl, uploadRes, _error$response5, _t5;
    return _regenerator().w(function (_context5) {
      while (1) switch (_context5.p = _context5.n) {
        case 0:
          _req$body2 = req.body, userId = _req$body2.userId, videoUrl = _req$body2.videoUrl, title = _req$body2.title, description = _req$body2.description;
          _context5.p = 1;
          _context5.n = 2;
          return _meta_userModel["default"].findOne({
            userId: userId
          });
        case 2:
          _metaUser5 = _context5.v;
          if (_metaUser5) {
            _context5.n = 3;
            break;
          }
          throw new Error("Meta user not found");
        case 3:
          pageToken = _metaUser5.facebook.pages[0].pageAccessToken;
          pageId = _metaUser5.facebook.pages[0].pageId; // Facebook video upload endpoint
          uploadUrl = "https://graph.facebook.com/".concat(pageId, "/videos"); // POST request to upload video
          _context5.n = 4;
          return _axios["default"].post(uploadUrl, {
            file_url: videoUrl,
            title: title || "",
            description: description || "",
            access_token: pageToken
          }, {
            headers: {
              "Content-Type": "application/json"
            }
          });
        case 4:
          uploadRes = _context5.v;
          res.json({
            success: true,
            videoId: uploadRes.data.id
          });
          _context5.n = 6;
          break;
        case 5:
          _context5.p = 5;
          _t5 = _context5.v;
          console.error(((_error$response5 = _t5.response) === null || _error$response5 === void 0 ? void 0 : _error$response5.data) || _t5.message);
          res.status(500).json({
            message: "Failed to upload Facebook video"
          });
        case 6:
          return _context5.a(2);
      }
    }, _callee5, null, [[1, 5]]);
  }));
  return function (_x10, _x11) {
    return _ref5.apply(this, arguments);
  };
}());

/**
 * List comments on a post
 */
metaRoute.get("/facebook/comments/:postId", /*#__PURE__*/function () {
  var _ref6 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee6(req, res) {
    var _req$query2, userId, after, before, _req$query2$limit, limit, postId, _metaUser6, pageToken, params, commentsUrl, commentsRes, _error$response6, _t6;
    return _regenerator().w(function (_context6) {
      while (1) switch (_context6.p = _context6.n) {
        case 0:
          _req$query2 = req.query, userId = _req$query2.userId, after = _req$query2.after, before = _req$query2.before, _req$query2$limit = _req$query2.limit, limit = _req$query2$limit === void 0 ? 10 : _req$query2$limit;
          postId = req.params.postId;
          _context6.p = 1;
          _context6.n = 2;
          return _meta_userModel["default"].findOne({
            userId: userId
          });
        case 2:
          _metaUser6 = _context6.v;
          if (_metaUser6) {
            _context6.n = 3;
            break;
          }
          throw new Error("Meta user not found");
        case 3:
          pageToken = _metaUser6.facebook.pages[0].pageAccessToken;
          params = {
            access_token: pageToken,
            fields: "id,message,created_time,from",
            limit: limit
          };
          if (after) params.after = after;
          if (before) params.before = before;
          commentsUrl = "https://graph.facebook.com/".concat(postId, "/comments");
          _context6.n = 4;
          return _axios["default"].get(commentsUrl, {
            params: params
          });
        case 4:
          commentsRes = _context6.v;
          res.json({
            success: true,
            comments: commentsRes.data.data,
            paging: commentsRes.data.paging || null
          });
          _context6.n = 6;
          break;
        case 5:
          _context6.p = 5;
          _t6 = _context6.v;
          console.error(((_error$response6 = _t6.response) === null || _error$response6 === void 0 ? void 0 : _error$response6.data) || _t6.message);
          res.status(500).json({
            message: "Failed to fetch comments"
          });
        case 6:
          return _context6.a(2);
      }
    }, _callee6, null, [[1, 5]]);
  }));
  return function (_x12, _x13) {
    return _ref6.apply(this, arguments);
  };
}());

/**
 * Create a comment on a post
 */
metaRoute.post("/facebook/comments/:postId", getValidToken, /*#__PURE__*/function () {
  var _ref7 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee7(req, res) {
    var _req$body3, userId, message, postId, _metaUser7, pageToken, createUrl, createRes, _error$response7, _t7;
    return _regenerator().w(function (_context7) {
      while (1) switch (_context7.p = _context7.n) {
        case 0:
          _req$body3 = req.body, userId = _req$body3.userId, message = _req$body3.message;
          postId = req.params.postId;
          _context7.p = 1;
          _context7.n = 2;
          return _meta_userModel["default"].findOne({
            userId: userId
          });
        case 2:
          _metaUser7 = _context7.v;
          if (_metaUser7) {
            _context7.n = 3;
            break;
          }
          throw new Error("Meta user not found");
        case 3:
          pageToken = _metaUser7.facebook.pages[0].pageAccessToken;
          createUrl = "https://graph.facebook.com/".concat(postId, "/comments");
          _context7.n = 4;
          return _axios["default"].post(createUrl, {
            message: message,
            access_token: pageToken
          });
        case 4:
          createRes = _context7.v;
          res.json({
            success: true,
            commentId: createRes.data.id
          });
          _context7.n = 6;
          break;
        case 5:
          _context7.p = 5;
          _t7 = _context7.v;
          console.error(((_error$response7 = _t7.response) === null || _error$response7 === void 0 ? void 0 : _error$response7.data) || _t7.message);
          res.status(500).json({
            message: "Failed to create comment"
          });
        case 6:
          return _context7.a(2);
      }
    }, _callee7, null, [[1, 5]]);
  }));
  return function (_x14, _x15) {
    return _ref7.apply(this, arguments);
  };
}());

/**
 * Update a comment
 */
metaRoute.put("/facebook/comments/:commentId", getValidToken, /*#__PURE__*/function () {
  var _ref8 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee8(req, res) {
    var _req$body4, userId, message, commentId, _metaUser8, pageToken, updateUrl, updateRes, _error$response8, _t8;
    return _regenerator().w(function (_context8) {
      while (1) switch (_context8.p = _context8.n) {
        case 0:
          _req$body4 = req.body, userId = _req$body4.userId, message = _req$body4.message;
          commentId = req.params.commentId;
          _context8.p = 1;
          _context8.n = 2;
          return _meta_userModel["default"].findOne({
            userId: userId
          });
        case 2:
          _metaUser8 = _context8.v;
          if (_metaUser8) {
            _context8.n = 3;
            break;
          }
          throw new Error("Meta user not found");
        case 3:
          pageToken = _metaUser8.facebook.pages[0].pageAccessToken;
          updateUrl = "https://graph.facebook.com/".concat(commentId);
          _context8.n = 4;
          return _axios["default"].post(updateUrl, {
            message: message,
            access_token: pageToken
          });
        case 4:
          updateRes = _context8.v;
          res.json({
            success: true,
            updated: updateRes.data
          });
          _context8.n = 6;
          break;
        case 5:
          _context8.p = 5;
          _t8 = _context8.v;
          console.error(((_error$response8 = _t8.response) === null || _error$response8 === void 0 ? void 0 : _error$response8.data) || _t8.message);
          res.status(500).json({
            message: "Failed to update comment"
          });
        case 6:
          return _context8.a(2);
      }
    }, _callee8, null, [[1, 5]]);
  }));
  return function (_x16, _x17) {
    return _ref8.apply(this, arguments);
  };
}());

/**
 * Delete a comment
 */
metaRoute["delete"]("/facebook/comments/:commentId", /*#__PURE__*/function () {
  var _ref9 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee9(req, res) {
    var userId, commentId, _metaUser9, pageToken, deleteUrl, deleteRes, _error$response9, _t9;
    return _regenerator().w(function (_context9) {
      while (1) switch (_context9.p = _context9.n) {
        case 0:
          userId = req.query.userId;
          commentId = req.params.commentId;
          _context9.p = 1;
          _context9.n = 2;
          return _meta_userModel["default"].findOne({
            userId: userId
          });
        case 2:
          _metaUser9 = _context9.v;
          if (_metaUser9) {
            _context9.n = 3;
            break;
          }
          throw new Error("Meta user not found");
        case 3:
          pageToken = _metaUser9.facebook.pages[0].pageAccessToken;
          deleteUrl = "https://graph.facebook.com/".concat(commentId);
          _context9.n = 4;
          return _axios["default"]["delete"](deleteUrl, {
            params: {
              access_token: pageToken
            }
          });
        case 4:
          deleteRes = _context9.v;
          res.json({
            success: true,
            deleted: deleteRes.data.success
          });
          _context9.n = 6;
          break;
        case 5:
          _context9.p = 5;
          _t9 = _context9.v;
          console.error(((_error$response9 = _t9.response) === null || _error$response9 === void 0 ? void 0 : _error$response9.data) || _t9.message);
          res.status(500).json({
            message: "Failed to delete comment"
          });
        case 6:
          return _context9.a(2);
      }
    }, _callee9, null, [[1, 5]]);
  }));
  return function (_x18, _x19) {
    return _ref9.apply(this, arguments);
  };
}());

/*****************************************************
 * INSTAGRAM ROUTES
****************************************************
*/

/**
 * Create an Instagram Post
 * 
 * Use a properly sized image that fits Instagram’s requirements:

*  Typical aspect ratios accepted for Instagram feed posts:

        Landscape: 1.91:1

        Square: 1:1

        Portrait: 4:5

        eg use this sample (https://100xinsider.com/uploads/1745193177OPINION_blog_image_1745193177.png)
 */
metaRoute.post("/instagram/image-text/create", getValidToken, /*#__PURE__*/function () {
  var _ref0 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee0(req, res) {
    var _req$body5, userId, caption, imageUrl, _metaUser0, igUserId, pageToken, mediaRes, publishRes, _error$response0, _t0;
    return _regenerator().w(function (_context0) {
      while (1) switch (_context0.p = _context0.n) {
        case 0:
          _req$body5 = req.body, userId = _req$body5.userId, caption = _req$body5.caption, imageUrl = _req$body5.imageUrl;
          _context0.p = 1;
          _context0.n = 2;
          return _meta_userModel["default"].findOne({
            userId: userId
          });
        case 2:
          _metaUser0 = _context0.v;
          if (!(!_metaUser0 || !_metaUser0.instagram.igUserId)) {
            _context0.n = 3;
            break;
          }
          throw new Error("Instagram account not linked");
        case 3:
          igUserId = _metaUser0.instagram.igUserId;
          pageToken = _metaUser0.facebook.pages[0].pageAccessToken; // Step 1: Create media container
          _context0.n = 4;
          return _axios["default"].post("https://graph.facebook.com/".concat(igUserId, "/media"), {
            image_url: imageUrl,
            caption: caption,
            access_token: pageToken
          });
        case 4:
          mediaRes = _context0.v;
          _context0.n = 5;
          return _axios["default"].post("https://graph.facebook.com/".concat(igUserId, "/media_publish"), {
            creation_id: mediaRes.data.id,
            access_token: pageToken
          });
        case 5:
          publishRes = _context0.v;
          res.json({
            success: true,
            postId: publishRes.data.id
          });
          _context0.n = 7;
          break;
        case 6:
          _context0.p = 6;
          _t0 = _context0.v;
          console.error(((_error$response0 = _t0.response) === null || _error$response0 === void 0 ? void 0 : _error$response0.data) || _t0.message);
          res.status(500).json({
            message: "Failed to create Instagram post"
          });
        case 7:
          return _context0.a(2);
      }
    }, _callee0, null, [[1, 6]]);
  }));
  return function (_x20, _x21) {
    return _ref0.apply(this, arguments);
  };
}());

/**
 * Get instagram posts
 */
metaRoute.get("/instagram/posts", /*#__PURE__*/function () {
  var _ref1 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee1(req, res) {
    var _req$query3, userId, _req$query3$limit, limit, after, before, _metaUser1, igUserId, pageToken, params, postsRes, _error$response1, _t1;
    return _regenerator().w(function (_context1) {
      while (1) switch (_context1.p = _context1.n) {
        case 0:
          _req$query3 = req.query, userId = _req$query3.userId, _req$query3$limit = _req$query3.limit, limit = _req$query3$limit === void 0 ? 10 : _req$query3$limit, after = _req$query3.after, before = _req$query3.before;
          _context1.p = 1;
          _context1.n = 2;
          return _meta_userModel["default"].findOne({
            userId: userId
          });
        case 2:
          _metaUser1 = _context1.v;
          if (!(!_metaUser1 || !_metaUser1.instagram.igUserId)) {
            _context1.n = 3;
            break;
          }
          throw new Error("Instagram account not linked");
        case 3:
          igUserId = _metaUser1.instagram.igUserId;
          pageToken = _metaUser1.facebook.pages[0].pageAccessToken;
          params = {
            access_token: pageToken,
            fields: "id,caption,media_type,media_url,permalink,timestamp",
            limit: limit
          };
          if (after) params.after = after;
          if (before) params.before = before;
          _context1.n = 4;
          return _axios["default"].get("https://graph.facebook.com/".concat(igUserId, "/media"), {
            params: params
          });
        case 4:
          postsRes = _context1.v;
          res.json({
            success: true,
            posts: postsRes.data.data,
            paging: postsRes.data.paging || null
          });
          _context1.n = 6;
          break;
        case 5:
          _context1.p = 5;
          _t1 = _context1.v;
          console.error(((_error$response1 = _t1.response) === null || _error$response1 === void 0 ? void 0 : _error$response1.data) || _t1.message);
          res.status(500).json({
            message: "Failed to fetch Instagram posts"
          });
        case 6:
          return _context1.a(2);
      }
    }, _callee1, null, [[1, 5]]);
  }));
  return function (_x22, _x23) {
    return _ref1.apply(this, arguments);
  };
}());

/**
 * Create instagram video
 * 
 * Instagram Video Upload Requirements (Simple Upload Method)

    Maximum file size: 100 MB, 

    Maximum video length: 60 seconds (for feed videos; longer videos require IGTV or Reels API)

    Recommended formats: MP4 (H.264 codec, AAC audio)

    Square: 1:1 (e.g., 1080×1080)  

    Portrait: between 4:5 (e.g., 1080×1350)

    Landscape: minimum 1.91:1 (e.g., 1080×566)

    Upload method: Simple upload (direct single request, ≤ 100 MB)

    Required permissions:

        instagram_basic

        pages_show_list

        instagram_content_publish

        Valid Instagram Business or Creator account linked to a Facebook Page with a Page Access Token */
metaRoute.post("/instagram/video", getValidToken, /*#__PURE__*/function () {
  var _ref10 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee10(req, res) {
    var _req$body6, userId, caption, videoUrl, _metaUser10, igUserId, pageToken, mediaRes, publishRes, _error$response10, _t10;
    return _regenerator().w(function (_context10) {
      while (1) switch (_context10.p = _context10.n) {
        case 0:
          _req$body6 = req.body, userId = _req$body6.userId, caption = _req$body6.caption, videoUrl = _req$body6.videoUrl;
          _context10.p = 1;
          _context10.n = 2;
          return _meta_userModel["default"].findOne({
            userId: userId
          });
        case 2:
          _metaUser10 = _context10.v;
          if (!(!_metaUser10 || !_metaUser10.instagram.igUserId)) {
            _context10.n = 3;
            break;
          }
          throw new Error("Instagram account not linked");
        case 3:
          igUserId = _metaUser10.instagram.igUserId;
          pageToken = _metaUser10.facebook.pages[0].pageAccessToken;
          _context10.n = 4;
          return _axios["default"].post("https://graph.facebook.com/".concat(igUserId, "/media"), {
            video_url: videoUrl,
            caption: caption,
            access_token: pageToken
          });
        case 4:
          mediaRes = _context10.v;
          _context10.n = 5;
          return _axios["default"].post("https://graph.facebook.com/".concat(igUserId, "/media_publish"), {
            creation_id: mediaRes.data.id,
            access_token: pageToken
          });
        case 5:
          publishRes = _context10.v;
          res.json({
            success: true,
            postId: publishRes.data.id
          });
          _context10.n = 7;
          break;
        case 6:
          _context10.p = 6;
          _t10 = _context10.v;
          console.error(((_error$response10 = _t10.response) === null || _error$response10 === void 0 ? void 0 : _error$response10.data) || _t10.message);
          res.status(500).json({
            message: "Failed to upload Instagram video"
          });
        case 7:
          return _context10.a(2);
      }
    }, _callee10, null, [[1, 6]]);
  }));
  return function (_x24, _x25) {
    return _ref10.apply(this, arguments);
  };
}());

/**
 * List comments on a post
 */
metaRoute.get("/instagram/comments/:postId", /*#__PURE__*/function () {
  var _ref11 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee11(req, res) {
    var _req$query4, userId, after, before, limit, postId, _metaUser11, pageToken, params, commentsRes, _error$response11, _t11;
    return _regenerator().w(function (_context11) {
      while (1) switch (_context11.p = _context11.n) {
        case 0:
          _req$query4 = req.query, userId = _req$query4.userId, after = _req$query4.after, before = _req$query4.before, limit = _req$query4.limit;
          postId = req.params.postId;
          _context11.p = 1;
          _context11.n = 2;
          return _meta_userModel["default"].findOne({
            userId: userId
          });
        case 2:
          _metaUser11 = _context11.v;
          if (!(!_metaUser11 || !_metaUser11.instagram.igUserId)) {
            _context11.n = 3;
            break;
          }
          throw new Error("Instagram account not linked");
        case 3:
          pageToken = _metaUser11.facebook.pages[0].pageAccessToken; // build params dynamically
          params = {
            fields: "id,text,username,timestamp",
            access_token: pageToken
          };
          if (after) params.after = after;
          if (before) params.before = before;
          if (limit) params.limit = limit;
          _context11.n = 4;
          return _axios["default"].get("https://graph.facebook.com/".concat(postId, "/comments"), {
            params: params
          });
        case 4:
          commentsRes = _context11.v;
          // Return comments + paging cursors from Facebook
          res.json({
            data: commentsRes.data.data,
            paging: commentsRes.data.paging
          });
          _context11.n = 6;
          break;
        case 5:
          _context11.p = 5;
          _t11 = _context11.v;
          console.error(((_error$response11 = _t11.response) === null || _error$response11 === void 0 ? void 0 : _error$response11.data) || _t11.message);
          res.status(500).json({
            message: "Failed to list Instagram comments"
          });
        case 6:
          return _context11.a(2);
      }
    }, _callee11, null, [[1, 5]]);
  }));
  return function (_x26, _x27) {
    return _ref11.apply(this, arguments);
  };
}());

/**
 * Add comment to a post
 */
metaRoute.post("/instagram/comments/:postId", getValidToken, /*#__PURE__*/function () {
  var _ref12 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee12(req, res) {
    var _req$body7, userId, message, postId, _metaUser12, pageToken, commentRes, _error$response12, _t12;
    return _regenerator().w(function (_context12) {
      while (1) switch (_context12.p = _context12.n) {
        case 0:
          _req$body7 = req.body, userId = _req$body7.userId, message = _req$body7.message;
          postId = req.params.postId;
          _context12.p = 1;
          _context12.n = 2;
          return _meta_userModel["default"].findOne({
            userId: userId
          });
        case 2:
          _metaUser12 = _context12.v;
          if (!(!_metaUser12 || !_metaUser12.instagram.igUserId)) {
            _context12.n = 3;
            break;
          }
          throw new Error("Instagram account not linked");
        case 3:
          pageToken = _metaUser12.facebook.pages[0].pageAccessToken;
          _context12.n = 4;
          return _axios["default"].post("https://graph.facebook.com/".concat(postId, "/comments"), {
            message: message,
            access_token: pageToken
          });
        case 4:
          commentRes = _context12.v;
          res.json(commentRes.data);
          _context12.n = 6;
          break;
        case 5:
          _context12.p = 5;
          _t12 = _context12.v;
          console.error(((_error$response12 = _t12.response) === null || _error$response12 === void 0 ? void 0 : _error$response12.data) || _t12.message);
          res.status(500).json({
            message: "Failed to add Instagram comment"
          });
        case 6:
          return _context12.a(2);
      }
    }, _callee12, null, [[1, 5]]);
  }));
  return function (_x28, _x29) {
    return _ref12.apply(this, arguments);
  };
}());

/**
 * Delete comment
 */
metaRoute["delete"]("/instagram/comments/:commentId/:userId", /*#__PURE__*/function () {
  var _ref13 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee13(req, res) {
    var commentId, userId, _metaUser13, pageToken, deleteRes, _error$response13, _t13;
    return _regenerator().w(function (_context13) {
      while (1) switch (_context13.p = _context13.n) {
        case 0:
          commentId = req.params.commentId;
          userId = req.params.userId;
          _context13.p = 1;
          _context13.n = 2;
          return _meta_userModel["default"].findOne({
            userId: userId
          });
        case 2:
          _metaUser13 = _context13.v;
          if (!(!_metaUser13 || !_metaUser13.instagram.igUserId)) {
            _context13.n = 3;
            break;
          }
          throw new Error("Instagram account not linked");
        case 3:
          pageToken = _metaUser13.facebook.pages[0].pageAccessToken;
          _context13.n = 4;
          return _axios["default"]["delete"]("https://graph.facebook.com/".concat(commentId), {
            params: {
              access_token: pageToken
            }
          });
        case 4:
          deleteRes = _context13.v;
          res.json(deleteRes.data);
          _context13.n = 6;
          break;
        case 5:
          _context13.p = 5;
          _t13 = _context13.v;
          console.error(((_error$response13 = _t13.response) === null || _error$response13 === void 0 ? void 0 : _error$response13.data) || _t13.message);
          res.status(500).json({
            message: "Failed to delete Instagram comment"
          });
        case 6:
          return _context13.a(2);
      }
    }, _callee13, null, [[1, 5]]);
  }));
  return function (_x30, _x31) {
    return _ref13.apply(this, arguments);
  };
}());

/*****************************************************
 * META ADVERTS
****************************************************
*/

/*
 * Fetch all ads for a user
 */
metaRoute.get("/ads", /*#__PURE__*/function () {
  var _ref14 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee14(req, res) {
    var _req$query5, userId, after, before, limit, META_AD_ACCOUNT_ID, _metaUser14, accessToken, params, adsRes, _error$response14, _t14;
    return _regenerator().w(function (_context14) {
      while (1) switch (_context14.p = _context14.n) {
        case 0:
          _req$query5 = req.query, userId = _req$query5.userId, after = _req$query5.after, before = _req$query5.before, limit = _req$query5.limit;
          META_AD_ACCOUNT_ID = process.env.META_AD_ACCOUNT_ID;
          _context14.p = 1;
          _context14.n = 2;
          return _meta_userModel["default"].findOne({
            userId: userId
          });
        case 2:
          _metaUser14 = _context14.v;
          if (_metaUser14) {
            _context14.n = 3;
            break;
          }
          return _context14.a(2, res.status(404).json({
            message: "Meta user not found"
          }));
        case 3:
          accessToken = _metaUser14.facebook.userAccessToken; // Build params dynamically so Facebook handles pagination
          params = {
            access_token: accessToken,
            fields: "id,name,status,created_time,creative{id,name},adset{id,name},campaign{id,name}",
            limit: limit || 25
          };
          if (after) params.after = after;
          if (before) params.before = before;
          _context14.n = 4;
          return _axios["default"].get("https://graph.facebook.com/v18.0/".concat(META_AD_ACCOUNT_ID, "/ads"), {
            params: params
          });
        case 4:
          adsRes = _context14.v;
          res.json({
            success: true,
            ads: adsRes.data.data,
            paging: adsRes.data.paging
          });
          _context14.n = 6;
          break;
        case 5:
          _context14.p = 5;
          _t14 = _context14.v;
          console.error("Fetch Ads error:", ((_error$response14 = _t14.response) === null || _error$response14 === void 0 ? void 0 : _error$response14.data) || _t14.message);
          res.status(500).json({
            message: "Failed to fetch ads"
          });
        case 6:
          return _context14.a(2);
      }
    }, _callee14, null, [[1, 5]]);
  }));
  return function (_x32, _x33) {
    return _ref14.apply(this, arguments);
  };
}());

/**
 * Create an Advert (Facebook & Instagram)
 */
metaRoute.post("/advert", getValidToken, /*#__PURE__*/function () {
  var _ref15 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee15(req, res) {
    var _req$body8, userId, adName, adCreative, campaignName, dailyBudget, _process$env2, META_AD_ACCOUNT_ID, META_DEFAULT_OBJECTIVE, META_CURRENCY, _metaUser15, accessToken, campaignRes, adSetRes, creativeRes, adRes, _error$response15, _t15;
    return _regenerator().w(function (_context15) {
      while (1) switch (_context15.p = _context15.n) {
        case 0:
          _req$body8 = req.body, userId = _req$body8.userId, adName = _req$body8.adName, adCreative = _req$body8.adCreative, campaignName = _req$body8.campaignName, dailyBudget = _req$body8.dailyBudget;
          _process$env2 = process.env, META_AD_ACCOUNT_ID = _process$env2.META_AD_ACCOUNT_ID, META_DEFAULT_OBJECTIVE = _process$env2.META_DEFAULT_OBJECTIVE, META_CURRENCY = _process$env2.META_CURRENCY;
          _context15.p = 1;
          _context15.n = 2;
          return _meta_userModel["default"].findOne({
            userId: userId
          });
        case 2:
          _metaUser15 = _context15.v;
          if (_metaUser15) {
            _context15.n = 3;
            break;
          }
          return _context15.a(2, res.status(404).json({
            message: "Meta user not found"
          }));
        case 3:
          accessToken = _metaUser15.facebook.userAccessToken; // Step 1: Create Campaign
          _context15.n = 4;
          return _axios["default"].post("https://graph.facebook.com/v18.0/".concat(META_AD_ACCOUNT_ID, "/campaigns"), {
            name: campaignName,
            objective: META_DEFAULT_OBJECTIVE,
            status: "PAUSED"
          }, {
            params: {
              access_token: accessToken
            }
          });
        case 4:
          campaignRes = _context15.v;
          _context15.n = 5;
          return _axios["default"].post("https://graph.facebook.com/v18.0/".concat(META_AD_ACCOUNT_ID, "/adsets"), {
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
        case 5:
          adSetRes = _context15.v;
          _context15.n = 6;
          return _axios["default"].post("https://graph.facebook.com/v18.0/".concat(META_AD_ACCOUNT_ID, "/adcreatives"), {
            name: adName,
            object_story_spec: adCreative
          }, {
            params: {
              access_token: accessToken
            }
          });
        case 6:
          creativeRes = _context15.v;
          _context15.n = 7;
          return _axios["default"].post("https://graph.facebook.com/v18.0/".concat(META_AD_ACCOUNT_ID, "/ads"), {
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
        case 7:
          adRes = _context15.v;
          res.json({
            success: true,
            campaignId: campaignRes.data.id,
            adSetId: adSetRes.data.id,
            creativeId: creativeRes.data.id,
            adId: adRes.data.id
          });
          _context15.n = 9;
          break;
        case 8:
          _context15.p = 8;
          _t15 = _context15.v;
          console.error("Ad creation error:", ((_error$response15 = _t15.response) === null || _error$response15 === void 0 ? void 0 : _error$response15.data) || _t15.message);
          res.status(500).json({
            message: "Failed to create advert"
          });
        case 9:
          return _context15.a(2);
      }
    }, _callee15, null, [[1, 8]]);
  }));
  return function (_x34, _x35) {
    return _ref15.apply(this, arguments);
  };
}());

/**
 * Update an existing ad
 */
metaRoute.put("/ads/:adId", getValidToken, /*#__PURE__*/function () {
  var _ref16 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee16(req, res) {
    var _req$body9, userId, name, status, adId, accessToken, updateRes, _error$response16, _t16;
    return _regenerator().w(function (_context16) {
      while (1) switch (_context16.p = _context16.n) {
        case 0:
          _req$body9 = req.body, userId = _req$body9.userId, name = _req$body9.name, status = _req$body9.status;
          adId = req.params.adId;
          _context16.p = 1;
          if (metaUser) {
            _context16.n = 2;
            break;
          }
          return _context16.a(2, res.status(404).json({
            message: "Meta user not found"
          }));
        case 2:
          accessToken = metaUser.facebook.userAccessToken;
          _context16.n = 3;
          return _axios["default"].post("https://graph.facebook.com/v18.0/".concat(adId), _objectSpread(_objectSpread({}, name && {
            name: name
          }), status && {
            status: status
          }), {
            params: {
              access_token: accessToken
            }
          });
        case 3:
          updateRes = _context16.v;
          res.json({
            success: true,
            updated: updateRes.data
          });
          _context16.n = 5;
          break;
        case 4:
          _context16.p = 4;
          _t16 = _context16.v;
          console.error("Update Ad error:", ((_error$response16 = _t16.response) === null || _error$response16 === void 0 ? void 0 : _error$response16.data) || _t16.message);
          res.status(500).json({
            message: "Failed to update ad"
          });
        case 5:
          return _context16.a(2);
      }
    }, _callee16, null, [[1, 4]]);
  }));
  return function (_x36, _x37) {
    return _ref16.apply(this, arguments);
  };
}());

/**
 * Delete an ad
 */
metaRoute["delete"]("/ads/:adId", getValidToken, /*#__PURE__*/function () {
  var _ref17 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee17(req, res) {
    var userId, adId, accessToken, deleteRes, _error$response17, _t17;
    return _regenerator().w(function (_context17) {
      while (1) switch (_context17.p = _context17.n) {
        case 0:
          userId = req.body.userId;
          adId = req.params.adId;
          _context17.p = 1;
          if (metaUser) {
            _context17.n = 2;
            break;
          }
          return _context17.a(2, res.status(404).json({
            message: "Meta user not found"
          }));
        case 2:
          accessToken = metaUser.facebook.userAccessToken;
          _context17.n = 3;
          return _axios["default"]["delete"]("https://graph.facebook.com/v18.0/".concat(adId), {
            params: {
              access_token: accessToken
            }
          });
        case 3:
          deleteRes = _context17.v;
          res.json({
            success: true,
            deleted: deleteRes.data
          });
          _context17.n = 5;
          break;
        case 4:
          _context17.p = 4;
          _t17 = _context17.v;
          console.error("Delete Ad error:", ((_error$response17 = _t17.response) === null || _error$response17 === void 0 ? void 0 : _error$response17.data) || _t17.message);
          res.status(500).json({
            message: "Failed to delete ad"
          });
        case 5:
          return _context17.a(2);
      }
    }, _callee17, null, [[1, 4]]);
  }));
  return function (_x38, _x39) {
    return _ref17.apply(this, arguments);
  };
}());
var _default = exports["default"] = metaRoute;