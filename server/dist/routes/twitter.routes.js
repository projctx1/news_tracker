"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _mongoose = _interopRequireDefault(require("mongoose"));
var _tweetModel = _interopRequireDefault(require("../models/tweet.model.js"));
var _target_accountModel = _interopRequireDefault(require("../models/target_account.model.js"));
var _twitter_userModel = _interopRequireDefault(require("../models/twitter_user.model.js"));
var _twitterApiV = _interopRequireDefault(require("twitter-api-v2"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
var twitterClient = new _twitterApiV["default"]({
  clientId: process.env.TWITTER_CLIENT_ID,
  clientSecret: process.env.TWITTER_CLIENT_SECRET
});
var twitterRoute = _express["default"].Router();

//  fetch all scraped tweet with pagination & optional filters
twitterRoute.get('/target-tweets', /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(req, res) {
    var page, limit, filters, tweets, total, _t;
    return _regenerator().w(function (_context) {
      while (1) switch (_context.p = _context.n) {
        case 0:
          _context.p = 0;
          // Query params for pagination
          page = parseInt(req.query.page) || 1;
          limit = parseInt(req.query.limit) || 10; // Optional filters (example: by author or keyword)
          filters = {};
          if (req.query.author) {
            filters.author = req.query.author;
          }
          if (req.query.keyword) {
            filters.text = {
              $regex: req.query.keyword,
              $options: 'i'
            };
          }

          // Fetch tweets
          _context.n = 1;
          return _tweetModel["default"].find(filters).sort({
            createdAt: -1
          }).skip((page - 1) * limit).limit(limit);
        case 1:
          tweets = _context.v;
          _context.n = 2;
          return _tweetModel["default"].countDocuments(filters);
        case 2:
          total = _context.v;
          res.json({
            page: page,
            limit: limit,
            totalPages: Math.ceil(total / limit),
            totalRecords: total,
            data: tweets
          });
          _context.n = 4;
          break;
        case 3:
          _context.p = 3;
          _t = _context.v;
          console.error(_t);
          res.status(500).json({
            message: 'Server error fetching tweets'
          });
        case 4:
          return _context.a(2);
      }
    }, _callee, null, [[0, 3]]);
  }));
  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}());

// Create Tweet for a specific TwitterUser
// This route do not return json response, instead it redirect the user to the twitter login
twitterRoute.get('/auth', /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2(req, res) {
    var _twitterClient$genera, url, codeVerifier, state;
    return _regenerator().w(function (_context2) {
      while (1) switch (_context2.n) {
        case 0:
          _twitterClient$genera = twitterClient.generateOAuth2AuthLink(process.env.TWITTER_CALLBACK_URL, {
            scope: ['tweet.read', 'tweet.write', 'users.read', 'offline.access']
          }), url = _twitterClient$genera.url, codeVerifier = _twitterClient$genera.codeVerifier, state = _twitterClient$genera.state; // Save verifier & state in session or temp store
          req.session = {
            codeVerifier: codeVerifier,
            state: state
          };
          res.redirect(url);
        case 1:
          return _context2.a(2);
      }
    }, _callee2);
  }));
  return function (_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}());

//Callback from Twitter
twitterRoute.get('/callback', /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3(req, res) {
    var _req$query, state, code, _yield$twitterClient$, loggedClient, accessToken, refreshToken, me, existingUser, existingTarget, _t2;
    return _regenerator().w(function (_context3) {
      while (1) switch (_context3.p = _context3.n) {
        case 0:
          _req$query = req.query, state = _req$query.state, code = _req$query.code;
          if (!(!state || !code || state !== req.session.state)) {
            _context3.n = 1;
            break;
          }
          return _context3.a(2, res.status(400).send("Invalid state or code"));
        case 1:
          _context3.p = 1;
          _context3.n = 2;
          return twitterClient.loginWithOAuth2({
            code: code,
            codeVerifier: req.session.codeVerifier,
            redirectUri: process.env.TWITTER_CALLBACK_URL
          });
        case 2:
          _yield$twitterClient$ = _context3.v;
          loggedClient = _yield$twitterClient$.client;
          accessToken = _yield$twitterClient$.accessToken;
          refreshToken = _yield$twitterClient$.refreshToken;
          _context3.n = 3;
          return loggedClient.v2.me();
        case 3:
          me = _context3.v;
          _context3.n = 4;
          return _twitter_userModel["default"].findOne({
            accountId: me.data.id
          });
        case 4:
          existingUser = _context3.v;
          if (existingUser) {
            _context3.n = 7;
            break;
          }
          _context3.n = 5;
          return _twitter_userModel["default"].create({
            username: me.data.username,
            accountId: me.data.id,
            accessToken: accessToken,
            accessSecret: refreshToken || ''
          });
        case 5:
          existingUser = _context3.v;
          _context3.n = 6;
          return _target_accountModel["default"].findOne({
            author_username: me.data.username
          });
        case 6:
          existingTarget = _context3.v;
          if (existingTarget) {
            _context3.n = 7;
            break;
          }
          _context3.n = 7;
          return _target_accountModel["default"].create({
            author_username: me.data.username
          });
        case 7:
          res.send("Twitter account connected!");
          _context3.n = 9;
          break;
        case 8:
          _context3.p = 8;
          _t2 = _context3.v;
          console.error(_t2);
          res.status(500).send("Authentication failed");
        case 9:
          return _context3.a(2);
      }
    }, _callee3, null, [[1, 8]]);
  }));
  return function (_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}());

// Create a Twitter User (store account creds)
twitterRoute.post('/users', /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee4(req, res) {
    var _req$body, username, accountId, bearerToken, accessToken, accessSecret, user, _t3;
    return _regenerator().w(function (_context4) {
      while (1) switch (_context4.p = _context4.n) {
        case 0:
          _context4.p = 0;
          _req$body = req.body, username = _req$body.username, accountId = _req$body.accountId, bearerToken = _req$body.bearerToken, accessToken = _req$body.accessToken, accessSecret = _req$body.accessSecret;
          _context4.n = 1;
          return _twitter_userModel["default"].create({
            username: username,
            accountId: accountId,
            bearerToken: bearerToken,
            accessToken: accessToken,
            accessSecret: accessSecret
          });
        case 1:
          user = _context4.v;
          res.status(201).json(user);
          _context4.n = 3;
          break;
        case 2:
          _context4.p = 2;
          _t3 = _context4.v;
          res.status(500).json({
            error: _t3.message
          });
        case 3:
          return _context4.a(2);
      }
    }, _callee4, null, [[0, 2]]);
  }));
  return function (_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}());

// Get all Twitter Users
twitterRoute.get('/users', /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee5(req, res) {
    var users;
    return _regenerator().w(function (_context5) {
      while (1) switch (_context5.n) {
        case 0:
          _context5.n = 1;
          return _twitter_userModel["default"].find();
        case 1:
          users = _context5.v;
          res.json(users);
        case 2:
          return _context5.a(2);
      }
    }, _callee5);
  }));
  return function (_x9, _x0) {
    return _ref5.apply(this, arguments);
  };
}());

// Update Twitter User
twitterRoute.put('/users/:id', /*#__PURE__*/function () {
  var _ref6 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee6(req, res) {
    var updated, _t4;
    return _regenerator().w(function (_context6) {
      while (1) switch (_context6.p = _context6.n) {
        case 0:
          _context6.p = 0;
          _context6.n = 1;
          return _twitter_userModel["default"].findByIdAndUpdate(req.params.id, req.body, {
            "new": true
          });
        case 1:
          updated = _context6.v;
          res.json(updated);
          _context6.n = 3;
          break;
        case 2:
          _context6.p = 2;
          _t4 = _context6.v;
          res.status(500).json({
            error: _t4.message
          });
        case 3:
          return _context6.a(2);
      }
    }, _callee6, null, [[0, 2]]);
  }));
  return function (_x1, _x10) {
    return _ref6.apply(this, arguments);
  };
}());

// Delete Twitter User
twitterRoute["delete"]('/users/:id', /*#__PURE__*/function () {
  var _ref7 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee7(req, res) {
    var _t5;
    return _regenerator().w(function (_context7) {
      while (1) switch (_context7.p = _context7.n) {
        case 0:
          _context7.p = 0;
          _context7.n = 1;
          return _twitter_userModel["default"].findByIdAndDelete(req.params.id);
        case 1:
          res.json({
            message: 'Twitter user deleted'
          });
          _context7.n = 3;
          break;
        case 2:
          _context7.p = 2;
          _t5 = _context7.v;
          res.status(500).json({
            error: _t5.message
          });
        case 3:
          return _context7.a(2);
      }
    }, _callee7, null, [[0, 2]]);
  }));
  return function (_x11, _x12) {
    return _ref7.apply(this, arguments);
  };
}());

// Get all target accounts
twitterRoute.get('/targets', /*#__PURE__*/function () {
  var _ref8 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee8(req, res) {
    var accounts, _t6;
    return _regenerator().w(function (_context8) {
      while (1) switch (_context8.p = _context8.n) {
        case 0:
          _context8.p = 0;
          _context8.n = 1;
          return _target_accountModel["default"].find();
        case 1:
          accounts = _context8.v;
          res.json(accounts);
          _context8.n = 3;
          break;
        case 2:
          _context8.p = 2;
          _t6 = _context8.v;
          res.status(500).json({
            error: _t6.message
          });
        case 3:
          return _context8.a(2);
      }
    }, _callee8, null, [[0, 2]]);
  }));
  return function (_x13, _x14) {
    return _ref8.apply(this, arguments);
  };
}());

// Create target account
twitterRoute.post('/targets', /*#__PURE__*/function () {
  var _ref9 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee9(req, res) {
    var account, _t7;
    return _regenerator().w(function (_context9) {
      while (1) switch (_context9.p = _context9.n) {
        case 0:
          _context9.p = 0;
          account = new _target_accountModel["default"](req.body);
          _context9.n = 1;
          return account.save();
        case 1:
          res.status(201).json(account);
          _context9.n = 3;
          break;
        case 2:
          _context9.p = 2;
          _t7 = _context9.v;
          res.status(400).json({
            error: _t7.message
          });
        case 3:
          return _context9.a(2);
      }
    }, _callee9, null, [[0, 2]]);
  }));
  return function (_x15, _x16) {
    return _ref9.apply(this, arguments);
  };
}());

// Update target account
twitterRoute.put('/targets/:id', /*#__PURE__*/function () {
  var _ref0 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee0(req, res) {
    var account, _t8;
    return _regenerator().w(function (_context0) {
      while (1) switch (_context0.p = _context0.n) {
        case 0:
          _context0.p = 0;
          _context0.n = 1;
          return _target_accountModel["default"].findByIdAndUpdate(req.params.id, req.body, {
            "new": true
          });
        case 1:
          account = _context0.v;
          if (account) {
            _context0.n = 2;
            break;
          }
          return _context0.a(2, res.status(404).json({
            error: 'Target account not found'
          }));
        case 2:
          res.json(account);
          _context0.n = 4;
          break;
        case 3:
          _context0.p = 3;
          _t8 = _context0.v;
          res.status(400).json({
            error: _t8.message
          });
        case 4:
          return _context0.a(2);
      }
    }, _callee0, null, [[0, 3]]);
  }));
  return function (_x17, _x18) {
    return _ref0.apply(this, arguments);
  };
}());

// Delete target account
twitterRoute["delete"]('/targets/:id', /*#__PURE__*/function () {
  var _ref1 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee1(req, res) {
    var account, _t9;
    return _regenerator().w(function (_context1) {
      while (1) switch (_context1.p = _context1.n) {
        case 0:
          _context1.p = 0;
          _context1.n = 1;
          return _target_accountModel["default"].findByIdAndDelete(req.params.id);
        case 1:
          account = _context1.v;
          if (account) {
            _context1.n = 2;
            break;
          }
          return _context1.a(2, res.status(404).json({
            error: 'Target account not found'
          }));
        case 2:
          res.json({
            message: 'Target account deleted successfully'
          });
          _context1.n = 4;
          break;
        case 3:
          _context1.p = 3;
          _t9 = _context1.v;
          res.status(500).json({
            error: _t9.message
          });
        case 4:
          return _context1.a(2);
      }
    }, _callee1, null, [[0, 3]]);
  }));
  return function (_x19, _x20) {
    return _ref1.apply(this, arguments);
  };
}());
var _default = exports["default"] = twitterRoute;