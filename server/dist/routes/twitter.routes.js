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
require('dotenv').config();
var twitterClient = new _twitterApiV["default"]({
  clientId: process.env.TWITTER_CLIENT_ID,
  clientSecret: process.env.TWITTER_CLIENT_SECRET
});
var twitterRoute = _express["default"].Router();

/**
 * 
 * Warp with user credentials for posting
 */
function getUserTwitterClient(_x) {
  return _getUserTwitterClient.apply(this, arguments);
}
/**
 * Create Tweet for a specific TwitterUser
 *  This route do not return json response, instead it redirect the user to the twitter login
 * 
 */
function _getUserTwitterClient() {
  _getUserTwitterClient = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee15(userId) {
    var twitterUser;
    return _regenerator().w(function (_context15) {
      while (1) switch (_context15.n) {
        case 0:
          _context15.n = 1;
          return _twitter_userModel["default"].findById(userId);
        case 1:
          twitterUser = _context15.v;
          if (twitterUser) {
            _context15.n = 2;
            break;
          }
          throw new Error('Twitter user not found');
        case 2:
          return _context15.a(2, twitterClient.loginWithAccessToken({
            accessToken: twitterUser.accessToken,
            accessSecret: twitterUser.accessSecret
          }));
      }
    }, _callee15);
  }));
  return _getUserTwitterClient.apply(this, arguments);
}
twitterRoute.get('/auth', /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(req, res) {
    var _twitterClient$genera, url, codeVerifier, state;
    return _regenerator().w(function (_context) {
      while (1) switch (_context.n) {
        case 0:
          _twitterClient$genera = twitterClient.generateOAuth2AuthLink(process.env.TWITTER_CALLBACK_URL, {
            scope: ['tweet.read', 'tweet.write', 'users.read', 'offline.access']
          }), url = _twitterClient$genera.url, codeVerifier = _twitterClient$genera.codeVerifier, state = _twitterClient$genera.state; // Save verifier & state in session or temp store
          req.session.codeVerifier = codeVerifier;
          req.session.state = state;
          _context.n = 1;
          return req.session.save();
        case 1:
          res.redirect(url);
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
 * Callback from Twitter
 * 
 */
twitterRoute.get('/callback', /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2(req, res) {
    var _req$query, state, code, _yield$twitterClient$, loggedClient, accessToken, refreshToken, me, existingUser, existingTarget, _t;
    return _regenerator().w(function (_context2) {
      while (1) switch (_context2.p = _context2.n) {
        case 0:
          _req$query = req.query, state = _req$query.state, code = _req$query.code;
          if (!(!state || !code || state !== req.session.state)) {
            _context2.n = 1;
            break;
          }
          return _context2.a(2, res.status(400).send("Invalid state or code"));
        case 1:
          _context2.p = 1;
          _context2.n = 2;
          return twitterClient.loginWithOAuth2({
            code: code,
            codeVerifier: req.session.codeVerifier,
            redirectUri: process.env.TWITTER_CALLBACK_URL
          });
        case 2:
          _yield$twitterClient$ = _context2.v;
          loggedClient = _yield$twitterClient$.client;
          accessToken = _yield$twitterClient$.accessToken;
          refreshToken = _yield$twitterClient$.refreshToken;
          _context2.n = 3;
          return loggedClient.v2.me();
        case 3:
          me = _context2.v;
          _context2.n = 4;
          return _twitter_userModel["default"].findOne({
            accountId: me.data.id
          });
        case 4:
          existingUser = _context2.v;
          if (existingUser) {
            _context2.n = 7;
            break;
          }
          _context2.n = 5;
          return _twitter_userModel["default"].create({
            username: me.data.username,
            accountId: me.data.id,
            accessToken: accessToken,
            accessSecret: refreshToken || ''
          });
        case 5:
          existingUser = _context2.v;
          _context2.n = 6;
          return _target_accountModel["default"].findOne({
            author_username: me.data.username
          });
        case 6:
          existingTarget = _context2.v;
          if (existingTarget) {
            _context2.n = 7;
            break;
          }
          _context2.n = 7;
          return _target_accountModel["default"].create({
            author_username: me.data.username
          });
        case 7:
          res.send("Twitter account connected!");
          _context2.n = 9;
          break;
        case 8:
          _context2.p = 8;
          _t = _context2.v;
          console.error(_t);
          res.status(500).send("Authentication failed");
        case 9:
          return _context2.a(2);
      }
    }, _callee2, null, [[1, 8]]);
  }));
  return function (_x4, _x5) {
    return _ref2.apply(this, arguments);
  };
}());

/**
 * 
 * fetch all scraped tweet with pagination & optional filters
 */
twitterRoute.get('/target-tweets', /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3(req, res) {
    var page, limit, filters, tweets, total, _t2;
    return _regenerator().w(function (_context3) {
      while (1) switch (_context3.p = _context3.n) {
        case 0:
          _context3.p = 0;
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
          _context3.n = 1;
          return _tweetModel["default"].find(filters).sort({
            createdAt: -1
          }).skip((page - 1) * limit).limit(limit);
        case 1:
          tweets = _context3.v;
          _context3.n = 2;
          return _tweetModel["default"].countDocuments(filters);
        case 2:
          total = _context3.v;
          res.json({
            page: page,
            limit: limit,
            totalPages: Math.ceil(total / limit),
            totalRecords: total,
            data: tweets
          });
          _context3.n = 4;
          break;
        case 3:
          _context3.p = 3;
          _t2 = _context3.v;
          console.error(_t2);
          res.status(500).json({
            message: 'Server error fetching tweets'
          });
        case 4:
          return _context3.a(2);
      }
    }, _callee3, null, [[0, 3]]);
  }));
  return function (_x6, _x7) {
    return _ref3.apply(this, arguments);
  };
}());

/**
 * Create a tweet
 * 
 */
twitterRoute.post('/post', /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee4(req, res) {
    var _req$body, userId, text, client, tweet, _t3;
    return _regenerator().w(function (_context4) {
      while (1) switch (_context4.p = _context4.n) {
        case 0:
          _req$body = req.body, userId = _req$body.userId, text = _req$body.text;
          _context4.p = 1;
          _context4.n = 2;
          return getUserTwitterClient(userId);
        case 2:
          client = _context4.v;
          _context4.n = 3;
          return client.v2.tweet(text);
        case 3:
          tweet = _context4.v;
          res.json({
            success: true,
            tweet: tweet
          });
          _context4.n = 5;
          break;
        case 4:
          _context4.p = 4;
          _t3 = _context4.v;
          console.error(_t3);
          res.status(500).json({
            message: 'Failed to create tweet'
          });
        case 5:
          return _context4.a(2);
      }
    }, _callee4, null, [[1, 4]]);
  }));
  return function (_x8, _x9) {
    return _ref4.apply(this, arguments);
  };
}());

/**
 * Get recent tweets posted by user on twitter
 * 
 */
twitterRoute.get('/posts', /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee5(req, res) {
    var _req$query2, userId, _req$query2$max_resul, max_results, pagination_token, twitterUser, client, userIdTwitter, tweets, _t4;
    return _regenerator().w(function (_context5) {
      while (1) switch (_context5.p = _context5.n) {
        case 0:
          _req$query2 = req.query, userId = _req$query2.userId, _req$query2$max_resul = _req$query2.max_results, max_results = _req$query2$max_resul === void 0 ? 10 : _req$query2$max_resul, pagination_token = _req$query2.pagination_token;
          _context5.p = 1;
          _context5.n = 2;
          return _twitter_userModel["default"].findById(userId);
        case 2:
          twitterUser = _context5.v;
          if (twitterUser) {
            _context5.n = 3;
            break;
          }
          return _context5.a(2, res.status(404).json({
            message: 'Twitter user not found'
          }));
        case 3:
          _context5.n = 4;
          return getUserTwitterClient(userId);
        case 4:
          client = _context5.v;
          // Get user id from stored accountId
          userIdTwitter = twitterUser.accountId;
          _context5.n = 5;
          return client.v2.userTimeline(userIdTwitter, {
            max_results: max_results,
            pagination_token: pagination_token,
            expansions: ['author_id'],
            'tweet.fields': ['created_at', 'public_metrics']
          });
        case 5:
          tweets = _context5.v;
          res.json({
            success: true,
            tweets: tweets.data,
            meta: tweets.meta
          });
          _context5.n = 7;
          break;
        case 6:
          _context5.p = 6;
          _t4 = _context5.v;
          console.error(_t4);
          res.status(500).json({
            message: 'Failed to fetch tweets'
          });
        case 7:
          return _context5.a(2);
      }
    }, _callee5, null, [[1, 6]]);
  }));
  return function (_x0, _x1) {
    return _ref5.apply(this, arguments);
  };
}());

/**
 * 
 * Create a reply (comment)
 */
twitterRoute.post('/comments', /*#__PURE__*/function () {
  var _ref6 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee6(req, res) {
    var _req$body2, userId, text, in_reply_to_tweet_id, client, reply, _t5;
    return _regenerator().w(function (_context6) {
      while (1) switch (_context6.p = _context6.n) {
        case 0:
          _req$body2 = req.body, userId = _req$body2.userId, text = _req$body2.text, in_reply_to_tweet_id = _req$body2.in_reply_to_tweet_id;
          _context6.p = 1;
          _context6.n = 2;
          return getUserTwitterClient(userId);
        case 2:
          client = _context6.v;
          _context6.n = 3;
          return client.v2.tweet(text, {
            reply: {
              in_reply_to_tweet_id: in_reply_to_tweet_id
            }
          });
        case 3:
          reply = _context6.v;
          res.json({
            success: true,
            reply: reply
          });
          _context6.n = 5;
          break;
        case 4:
          _context6.p = 4;
          _t5 = _context6.v;
          console.error(_t5);
          res.status(500).json({
            message: 'Failed to create reply'
          });
        case 5:
          return _context6.a(2);
      }
    }, _callee6, null, [[1, 4]]);
  }));
  return function (_x10, _x11) {
    return _ref6.apply(this, arguments);
  };
}());

/**
 * Delete a tweet
 */
twitterRoute["delete"]('/post/:tweetId', /*#__PURE__*/function () {
  var _ref7 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee7(req, res) {
    var userId, tweetId, client, _t6;
    return _regenerator().w(function (_context7) {
      while (1) switch (_context7.p = _context7.n) {
        case 0:
          userId = req.query.userId;
          tweetId = req.params.tweetId;
          _context7.p = 1;
          _context7.n = 2;
          return getUserTwitterClient(userId);
        case 2:
          client = _context7.v;
          _context7.n = 3;
          return client.v2.deleteTweet(tweetId);
        case 3:
          res.json({
            success: true,
            message: 'Tweet deleted'
          });
          _context7.n = 5;
          break;
        case 4:
          _context7.p = 4;
          _t6 = _context7.v;
          console.error(_t6);
          res.status(500).json({
            message: 'Failed to delete tweet'
          });
        case 5:
          return _context7.a(2);
      }
    }, _callee7, null, [[1, 4]]);
  }));
  return function (_x12, _x13) {
    return _ref7.apply(this, arguments);
  };
}());

/**
 * 
 * Update a comment/tweet (delete + repost)
 */
twitterRoute.put('/comments/:tweetId', /*#__PURE__*/function () {
  var _ref8 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee8(req, res) {
    var _req$body3, userId, text, tweetId, client, newTweet, _t7;
    return _regenerator().w(function (_context8) {
      while (1) switch (_context8.p = _context8.n) {
        case 0:
          _req$body3 = req.body, userId = _req$body3.userId, text = _req$body3.text;
          tweetId = req.params.tweetId;
          _context8.p = 1;
          _context8.n = 2;
          return getUserTwitterClient(userId);
        case 2:
          client = _context8.v;
          _context8.n = 3;
          return client.v2.deleteTweet(tweetId);
        case 3:
          _context8.n = 4;
          return client.v2.tweet(text);
        case 4:
          newTweet = _context8.v;
          res.json({
            success: true,
            tweet: newTweet
          });
          _context8.n = 6;
          break;
        case 5:
          _context8.p = 5;
          _t7 = _context8.v;
          console.error(_t7);
          res.status(500).json({
            message: 'Failed to update tweet'
          });
        case 6:
          return _context8.a(2);
      }
    }, _callee8, null, [[1, 5]]);
  }));
  return function (_x14, _x15) {
    return _ref8.apply(this, arguments);
  };
}());

/**
 * 
 * Create a Twitter User (store account creds) in db
 */
twitterRoute.post('/users', /*#__PURE__*/function () {
  var _ref9 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee9(req, res) {
    var _req$body4, username, accountId, bearerToken, accessToken, accessSecret, user, _t8;
    return _regenerator().w(function (_context9) {
      while (1) switch (_context9.p = _context9.n) {
        case 0:
          _context9.p = 0;
          _req$body4 = req.body, username = _req$body4.username, accountId = _req$body4.accountId, bearerToken = _req$body4.bearerToken, accessToken = _req$body4.accessToken, accessSecret = _req$body4.accessSecret;
          _context9.n = 1;
          return _twitter_userModel["default"].create({
            username: username,
            accountId: accountId,
            bearerToken: bearerToken,
            accessToken: accessToken,
            accessSecret: accessSecret
          });
        case 1:
          user = _context9.v;
          res.status(201).json(user);
          _context9.n = 3;
          break;
        case 2:
          _context9.p = 2;
          _t8 = _context9.v;
          res.status(500).json({
            error: _t8.message
          });
        case 3:
          return _context9.a(2);
      }
    }, _callee9, null, [[0, 2]]);
  }));
  return function (_x16, _x17) {
    return _ref9.apply(this, arguments);
  };
}());

/**
 * 
 *  Get all Twitter Users in db
 */
twitterRoute.get('/users', /*#__PURE__*/function () {
  var _ref0 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee0(req, res) {
    var users;
    return _regenerator().w(function (_context0) {
      while (1) switch (_context0.n) {
        case 0:
          _context0.n = 1;
          return _twitter_userModel["default"].find();
        case 1:
          users = _context0.v;
          res.json(users);
        case 2:
          return _context0.a(2);
      }
    }, _callee0);
  }));
  return function (_x18, _x19) {
    return _ref0.apply(this, arguments);
  };
}());

/**
 * 
 * Update Twitter User in db
 */
twitterRoute.put('/users/:id', /*#__PURE__*/function () {
  var _ref1 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee1(req, res) {
    var updated, _t9;
    return _regenerator().w(function (_context1) {
      while (1) switch (_context1.p = _context1.n) {
        case 0:
          _context1.p = 0;
          _context1.n = 1;
          return _twitter_userModel["default"].findByIdAndUpdate(req.params.id, req.body, {
            "new": true
          });
        case 1:
          updated = _context1.v;
          res.json(updated);
          _context1.n = 3;
          break;
        case 2:
          _context1.p = 2;
          _t9 = _context1.v;
          res.status(500).json({
            error: _t9.message
          });
        case 3:
          return _context1.a(2);
      }
    }, _callee1, null, [[0, 2]]);
  }));
  return function (_x20, _x21) {
    return _ref1.apply(this, arguments);
  };
}());

/**
 * 
 * Delete Twitter User in db
 */
twitterRoute["delete"]('/users/:id', /*#__PURE__*/function () {
  var _ref10 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee10(req, res) {
    var _t0;
    return _regenerator().w(function (_context10) {
      while (1) switch (_context10.p = _context10.n) {
        case 0:
          _context10.p = 0;
          _context10.n = 1;
          return _twitter_userModel["default"].findByIdAndDelete(req.params.id);
        case 1:
          res.json({
            message: 'Twitter user deleted'
          });
          _context10.n = 3;
          break;
        case 2:
          _context10.p = 2;
          _t0 = _context10.v;
          res.status(500).json({
            error: _t0.message
          });
        case 3:
          return _context10.a(2);
      }
    }, _callee10, null, [[0, 2]]);
  }));
  return function (_x22, _x23) {
    return _ref10.apply(this, arguments);
  };
}());

/**
 * Get all target accounts in db
 * 
 */
twitterRoute.get('/targets', /*#__PURE__*/function () {
  var _ref11 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee11(req, res) {
    var accounts, _t1;
    return _regenerator().w(function (_context11) {
      while (1) switch (_context11.p = _context11.n) {
        case 0:
          _context11.p = 0;
          _context11.n = 1;
          return _target_accountModel["default"].find();
        case 1:
          accounts = _context11.v;
          res.json(accounts);
          _context11.n = 3;
          break;
        case 2:
          _context11.p = 2;
          _t1 = _context11.v;
          res.status(500).json({
            error: _t1.message
          });
        case 3:
          return _context11.a(2);
      }
    }, _callee11, null, [[0, 2]]);
  }));
  return function (_x24, _x25) {
    return _ref11.apply(this, arguments);
  };
}());
/**
 * 
 * Create target account in db
 */
twitterRoute.post('/targets', /*#__PURE__*/function () {
  var _ref12 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee12(req, res) {
    var account, _t10;
    return _regenerator().w(function (_context12) {
      while (1) switch (_context12.p = _context12.n) {
        case 0:
          _context12.p = 0;
          account = new _target_accountModel["default"](req.body);
          _context12.n = 1;
          return account.save();
        case 1:
          res.status(201).json(account);
          _context12.n = 3;
          break;
        case 2:
          _context12.p = 2;
          _t10 = _context12.v;
          res.status(400).json({
            error: _t10.message
          });
        case 3:
          return _context12.a(2);
      }
    }, _callee12, null, [[0, 2]]);
  }));
  return function (_x26, _x27) {
    return _ref12.apply(this, arguments);
  };
}());

/**
 * Update target account in db
 */
twitterRoute.put('/targets/:id', /*#__PURE__*/function () {
  var _ref13 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee13(req, res) {
    var account, _t11;
    return _regenerator().w(function (_context13) {
      while (1) switch (_context13.p = _context13.n) {
        case 0:
          _context13.p = 0;
          _context13.n = 1;
          return _target_accountModel["default"].findByIdAndUpdate(req.params.id, req.body, {
            "new": true
          });
        case 1:
          account = _context13.v;
          if (account) {
            _context13.n = 2;
            break;
          }
          return _context13.a(2, res.status(404).json({
            error: 'Target account not found'
          }));
        case 2:
          res.json(account);
          _context13.n = 4;
          break;
        case 3:
          _context13.p = 3;
          _t11 = _context13.v;
          res.status(400).json({
            error: _t11.message
          });
        case 4:
          return _context13.a(2);
      }
    }, _callee13, null, [[0, 3]]);
  }));
  return function (_x28, _x29) {
    return _ref13.apply(this, arguments);
  };
}());

/***
 * Delete target account in db
 */
twitterRoute["delete"]('/targets/:id', /*#__PURE__*/function () {
  var _ref14 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee14(req, res) {
    var account, _t12;
    return _regenerator().w(function (_context14) {
      while (1) switch (_context14.p = _context14.n) {
        case 0:
          _context14.p = 0;
          _context14.n = 1;
          return _target_accountModel["default"].findByIdAndDelete(req.params.id);
        case 1:
          account = _context14.v;
          if (account) {
            _context14.n = 2;
            break;
          }
          return _context14.a(2, res.status(404).json({
            error: 'Target account not found'
          }));
        case 2:
          res.json({
            message: 'Target account deleted successfully'
          });
          _context14.n = 4;
          break;
        case 3:
          _context14.p = 3;
          _t12 = _context14.v;
          res.status(500).json({
            error: _t12.message
          });
        case 4:
          return _context14.a(2);
      }
    }, _callee14, null, [[0, 3]]);
  }));
  return function (_x30, _x31) {
    return _ref14.apply(this, arguments);
  };
}());
var _default = exports["default"] = twitterRoute;