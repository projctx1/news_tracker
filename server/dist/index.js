"use strict";

var _newsRoutes = _interopRequireDefault(require("./routes/news.routes.js"));
var _pricesRoutes = _interopRequireDefault(require("./routes/prices.routes.js"));
var _twitterRoutes = _interopRequireDefault(require("./routes/twitter.routes.js"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
require('dotenv').config();
var express = require('express');
var app = express();
var port = process.env.PORT;
require('./config/mongoose.config');
app.use(express.json());
var _require = require('./services/news.services'),
  getNews = _require.getNews;
var _require2 = require('./services/twitter.services'),
  getTweets = _require2.getTweets;
var _require3 = require('./services/poloniex.services.js'),
  getCryptoMarketPairsFromPoloniex = _require3.getCryptoMarketPairsFromPoloniex,
  getCryptoMarketPricesFromPoloniex = _require3.getCryptoMarketPricesFromPoloniex,
  getCandlestickDataFromPoloniex = _require3.getCandlestickDataFromPoloniex,
  savePoloniexCandlesForPair = _require3.savePoloniexCandlesForPair,
  getOrderBookFromPoloniex = _require3.getOrderBookFromPoloniex;
var _require4 = require('./services/stocks.services.js'),
  updateBiggestCompaniesStock = _require4.updateBiggestCompaniesStock;

//setup cronjobs
//getNews();
//getTweets();

//setInterval(getNews, 3600000);      // every hour
//setInterval(getTweets, 3600000);    // every hour

app.use('/api/news', _newsRoutes["default"]);
app.use('/api/prices', _pricesRoutes["default"]);
app.use('/api/twitter', _twitterRoutes["default"]);
var symbol = 'BTC_USDT';
var interval = 'MINUTE_30';
var limit = "149";
var now = new Date().getTime();
var oneDayAgo = now - 24 * 60 * 60 * 1000;
var startTime = oneDayAgo;
var endTime = now;

//getCandlestickDataFromPoloniex(symbol, interval, limit, startTime, endTime);
//getOrderBookFromPoloniex(symbol)
//getCryptoMarketPairsFromPoloniex();
//getCryptoMarketPricesFromPoloniex();
/*savePoloniexCandlesForPair({
  symbol: 'BTC_USDT', 
  interval: 'MINUTE_30',
})*/

updateBiggestCompaniesStock();
app.get('/health', /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(req, res, next) {
    return _regenerator().w(function (_context) {
      while (1) switch (_context.n) {
        case 0:
          try {
            console.log('✅ GET /health hit');
            res.status(200).json({
              message: 'server is up and running here now'
            });
          } catch (error) {
            next(error);
          }
        case 1:
          return _context.a(2);
      }
    }, _callee);
  }));
  return function (_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}());
app.get('/', function (req, res) {
  res.json({
    message: 'Welcome to the Node server!'
  });
});
app.listen(port, function () {
  console.log("Server running at http://localhost:".concat(port));
});