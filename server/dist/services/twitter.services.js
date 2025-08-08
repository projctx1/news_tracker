"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _regeneratorValues(e) { if (null != e) { var t = e["function" == typeof Symbol && Symbol.iterator || "@@iterator"], r = 0; if (t) return t.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) return { next: function next() { return e && r >= e.length && (e = void 0), { value: e && e[r++], done: !e }; } }; } throw new TypeError(_typeof(e) + " is not iterable"); }
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t["return"] || t["return"](); } finally { if (u) throw o; } } }; }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
require('dotenv').config();
var mongoose = require('../config/mongoose.config');
var axios = require('axios');
var TargetAccount = require('../models/target_account.model');
var Tweet = require('../models/tweet.model');
function getTweets() {
  return _getTweets.apply(this, arguments);
}
function _getTweets() {
  _getTweets = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee() {
    var targets, _iterator, _step, _data$includes, item, query, url, response, data, tweets, users, _iterator2, _step2, _loop, _t, _t2, _t3;
    return _regenerator().w(function (_context2) {
      while (1) switch (_context2.p = _context2.n) {
        case 0:
          if (!true) {
            _context2.n = 22;
            break;
          }
          console.log("Fetching tweets...");
          _context2.p = 1;
          _context2.n = 2;
          return TargetAccount.find({});
        case 2:
          targets = _context2.v;
          _iterator = _createForOfIteratorHelper(targets);
          _context2.p = 3;
          _iterator.s();
        case 4:
          if ((_step = _iterator.n()).done) {
            _context2.n = 15;
            break;
          }
          item = _step.value;
          query = "(from:".concat(item.author_username, ")");
          url = "https://api.twitter.com/2/tweets/search/recent" + "?query=".concat(encodeURIComponent(query)) + "&tweet.fields=created_at,author_id,text,public_metrics" + "&expansions=author_id" + "&user.fields=username,name,profile_image_url" + "&max_results=100";
          _context2.n = 5;
          return axios.get(url, {
            headers: {
              "Authorization": "Bearer ".concat(process.env.TWITTER_BEARER_TOKEN)
            }
          });
        case 5:
          response = _context2.v;
          data = response.data;
          tweets = (data === null || data === void 0 ? void 0 : data.data) || [];
          users = (data === null || data === void 0 || (_data$includes = data.includes) === null || _data$includes === void 0 ? void 0 : _data$includes.users) || [];
          if (!(tweets.length > 0)) {
            _context2.n = 13;
            break;
          }
          _iterator2 = _createForOfIteratorHelper(tweets);
          _context2.p = 6;
          _loop = /*#__PURE__*/_regenerator().m(function _loop() {
            var tweetModel, user, exists, _tweetModel$public_me, _tweetModel$public_me2, _tweetModel$public_me3, _tweetModel$public_me4;
            return _regenerator().w(function (_context) {
              while (1) switch (_context.n) {
                case 0:
                  tweetModel = _step2.value;
                  user = users.find(function (u) {
                    return u.id === tweetModel.author_id;
                  });
                  _context.n = 1;
                  return Tweet.exists({
                    TweetId: tweetModel.id
                  });
                case 1:
                  exists = _context.v;
                  if (exists) {
                    _context.n = 2;
                    break;
                  }
                  _context.n = 2;
                  return Tweet.create({
                    TweetId: tweetModel.id,
                    Text: tweetModel.text,
                    AuthorId: tweetModel.author_id,
                    TweetedAt: tweetModel.created_at,
                    AuthorUsername: user === null || user === void 0 ? void 0 : user.username,
                    AuthorName: user === null || user === void 0 ? void 0 : user.name,
                    AuthorProfileImageUrl: user === null || user === void 0 ? void 0 : user.profile_image_url,
                    RetweetCount: ((_tweetModel$public_me = tweetModel.public_metrics) === null || _tweetModel$public_me === void 0 ? void 0 : _tweetModel$public_me.retweet_count) || 0,
                    ReplyCount: ((_tweetModel$public_me2 = tweetModel.public_metrics) === null || _tweetModel$public_me2 === void 0 ? void 0 : _tweetModel$public_me2.reply_count) || 0,
                    LikeCount: ((_tweetModel$public_me3 = tweetModel.public_metrics) === null || _tweetModel$public_me3 === void 0 ? void 0 : _tweetModel$public_me3.like_count) || 0,
                    QuoteCount: ((_tweetModel$public_me4 = tweetModel.public_metrics) === null || _tweetModel$public_me4 === void 0 ? void 0 : _tweetModel$public_me4.quote_count) || 0
                  });
                case 2:
                  return _context.a(2);
              }
            }, _loop);
          });
          _iterator2.s();
        case 7:
          if ((_step2 = _iterator2.n()).done) {
            _context2.n = 9;
            break;
          }
          return _context2.d(_regeneratorValues(_loop()), 8);
        case 8:
          _context2.n = 7;
          break;
        case 9:
          _context2.n = 11;
          break;
        case 10:
          _context2.p = 10;
          _t = _context2.v;
          _iterator2.e(_t);
        case 11:
          _context2.p = 11;
          _iterator2.f();
          return _context2.f(11);
        case 12:
          console.log(" Tweets saved with author info and metrics.");
        case 13:
          _context2.n = 14;
          return new Promise(function (resolve) {
            return setTimeout(resolve, 32 * 60 * 1000);
          });
        case 14:
          _context2.n = 4;
          break;
        case 15:
          _context2.n = 17;
          break;
        case 16:
          _context2.p = 16;
          _t2 = _context2.v;
          _iterator.e(_t2);
        case 17:
          _context2.p = 17;
          _iterator.f();
          return _context2.f(17);
        case 18:
          _context2.n = 20;
          break;
        case 19:
          _context2.p = 19;
          _t3 = _context2.v;
          console.error(" Error fetching tweets:", _t3.message);
        case 20:
          _context2.n = 21;
          return new Promise(function (resolve) {
            return setTimeout(resolve, 12 * 60 * 60 * 1000);
          });
        case 21:
          _context2.n = 0;
          break;
        case 22:
          return _context2.a(2);
      }
    }, _callee, null, [[6, 10, 11, 12], [3, 16, 17, 18], [1, 19]]);
  }));
  return _getTweets.apply(this, arguments);
}
module.exports = {
  getTweets: getTweets
};