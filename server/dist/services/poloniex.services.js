"use strict";

var _PoloniexParser = _interopRequireDefault(require("../utils/PoloniexParser"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
var fs = require('fs').promises;
var poloniexApiUrl = 'https://api.poloniex.com';
function getCryptoMarketPairsFromPoloniex() {
  return _getCryptoMarketPairsFromPoloniex.apply(this, arguments);
}
/**
 * Fetches the latest market prices for all pairs from the Poloniex API.
 * @returns {Array} An array of market prices.
 */
function _getCryptoMarketPairsFromPoloniex() {
  _getCryptoMarketPairsFromPoloniex = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee() {
    var apiUrl, filename, response, data, jsonData, _t;
    return _regenerator().w(function (_context) {
      while (1) switch (_context.p = _context.n) {
        case 0:
          apiUrl = "".concat(poloniexApiUrl, "/markets");
          filename = 'poloniex_market_pairs.json';
          _context.p = 1;
          console.log('Fetching crypto market pairs from Poloniex API...');
          _context.n = 2;
          return fetch(apiUrl);
        case 2:
          response = _context.v;
          if (response.ok) {
            _context.n = 3;
            break;
          }
          throw new Error("HTTP error! Status: ".concat(response.status));
        case 3:
          _context.n = 4;
          return response.json();
        case 4:
          data = _context.v;
          console.log('Successfully fetched market pairs. Saving to file...');
          jsonData = JSON.stringify(data, null, 2);
          _context.n = 5;
          return fs.writeFile(filename, jsonData, 'utf8');
        case 5:
          console.log("Data successfully saved to ".concat(filename));
          return _context.a(2, data);
        case 6:
          _context.p = 6;
          _t = _context.v;
          console.error('An error occurred while fetching market pairs:', _t);
          return _context.a(2, []);
      }
    }, _callee, null, [[1, 6]]);
  }));
  return _getCryptoMarketPairsFromPoloniex.apply(this, arguments);
}
function getCryptoMarketPricesFromPoloniex() {
  return _getCryptoMarketPricesFromPoloniex.apply(this, arguments);
}
/**
 * Fetches historical candlestick data (OHLCV) for a specific trading pair.
 * @param {string} symbol The trading pair symbol, e.g., 'BTC_USDT'.
 * @param {string} interval The time interval for the candles (e.g., 'MINUTE_5', 'HOUR_1').
 * @param {number} [limit=100] The maximum number of records to return. Max is 500.
 * @returns {Array} An array of candlestick data.
 */
function _getCryptoMarketPricesFromPoloniex() {
  _getCryptoMarketPricesFromPoloniex = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2() {
    var apiUrl, filename, response, data, jsonData, _t2;
    return _regenerator().w(function (_context2) {
      while (1) switch (_context2.p = _context2.n) {
        case 0:
          apiUrl = "".concat(poloniexApiUrl, "/markets/price");
          filename = 'poloniex_market_prices.json';
          _context2.p = 1;
          console.log('Fetching crypto market prices from Poloniex API...');
          _context2.n = 2;
          return fetch(apiUrl);
        case 2:
          response = _context2.v;
          if (response.ok) {
            _context2.n = 3;
            break;
          }
          throw new Error("HTTP error! Status: ".concat(response.status));
        case 3:
          _context2.n = 4;
          return response.json();
        case 4:
          data = _context2.v;
          console.log('Successfully fetched market prices. Saving to file...');
          jsonData = JSON.stringify(data, null, 2);
          _context2.n = 5;
          return fs.writeFile(filename, jsonData, 'utf8');
        case 5:
          console.log("Data successfully saved to ".concat(filename));
          return _context2.a(2, data);
        case 6:
          _context2.p = 6;
          _t2 = _context2.v;
          console.error('An error occurred while fetching market prices:', _t2);
          return _context2.a(2, []);
      }
    }, _callee2, null, [[1, 6]]);
  }));
  return _getCryptoMarketPricesFromPoloniex.apply(this, arguments);
}
function getCandlestickDataFromPoloniex(_x, _x2) {
  return _getCandlestickDataFromPoloniex.apply(this, arguments);
}
/**
 * Fetches the order book for a specific trading pair.
 * @param {string} symbol The trading pair symbol, e.g., 'BTC_USDT'.
 * @param {number} [limit=10] The maximum number of records to return. Valid values are 5, 10, 20, 50, 100, 150.
 * @returns {Object} An object containing bids and asks.
 */
function _getCandlestickDataFromPoloniex() {
  _getCandlestickDataFromPoloniex = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3(symbol, interval) {
    var limit,
      apiUrl,
      filename,
      response,
      data,
      jsonData,
      _args3 = arguments,
      _t3;
    return _regenerator().w(function (_context3) {
      while (1) switch (_context3.p = _context3.n) {
        case 0:
          limit = _args3.length > 2 && _args3[2] !== undefined ? _args3[2] : 100;
          apiUrl = "".concat(poloniexApiUrl, "/markets/").concat(symbol, "/candles?interval=").concat(interval, "&limit=").concat(limit);
          filename = "poloniex_candles_".concat(symbol, "_").concat(interval, ".json");
          _context3.p = 1;
          console.log("Fetching candlestick data for ".concat(symbol, " with interval ").concat(interval, "..."));
          _context3.n = 2;
          return fetch(apiUrl);
        case 2:
          response = _context3.v;
          if (response.ok) {
            _context3.n = 3;
            break;
          }
          throw new Error("HTTP error! Status: ".concat(response.status));
        case 3:
          _context3.n = 4;
          return response.json();
        case 4:
          data = _context3.v;
          console.log('Successfully fetched candlestick data. Saving to file...');
          jsonData = JSON.stringify(data, null, 2);
          _context3.n = 5;
          return fs.writeFile(filename, jsonData, 'utf8');
        case 5:
          console.log("Data successfully saved to ".concat(filename));
          return _context3.a(2, data);
        case 6:
          _context3.p = 6;
          _t3 = _context3.v;
          console.error('An error occurred while fetching candlestick data:', _t3);
          return _context3.a(2, []);
      }
    }, _callee3, null, [[1, 6]]);
  }));
  return _getCandlestickDataFromPoloniex.apply(this, arguments);
}
function getOrderBookFromPoloniex(_x3) {
  return _getOrderBookFromPoloniex.apply(this, arguments);
}
function _getOrderBookFromPoloniex() {
  _getOrderBookFromPoloniex = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee4(symbol) {
    var limit,
      apiUrl,
      filename,
      response,
      data,
      jsonData,
      _args4 = arguments,
      _t4;
    return _regenerator().w(function (_context4) {
      while (1) switch (_context4.p = _context4.n) {
        case 0:
          limit = _args4.length > 1 && _args4[1] !== undefined ? _args4[1] : 10;
          apiUrl = "".concat(poloniexApiUrl, "/markets/").concat(symbol, "/orderBook?limit=").concat(limit);
          filename = "poloniex_orderbook_".concat(symbol, ".json");
          _context4.p = 1;
          console.log("Fetching order book for ".concat(symbol, "..."));
          _context4.n = 2;
          return fetch(apiUrl);
        case 2:
          response = _context4.v;
          if (response.ok) {
            _context4.n = 3;
            break;
          }
          throw new Error("HTTP error! Status: ".concat(response.status));
        case 3:
          _context4.n = 4;
          return response.json();
        case 4:
          data = _context4.v;
          console.log('Successfully fetched order book. Saving to file...');
          jsonData = JSON.stringify(data, null, 2);
          _context4.n = 5;
          return fs.writeFile(filename, jsonData, 'utf8');
        case 5:
          console.log("Data successfully saved to ".concat(filename));
          return _context4.a(2, data);
        case 6:
          _context4.p = 6;
          _t4 = _context4.v;
          console.error('An error occurred while fetching order book:', _t4);
          return _context4.a(2, null);
      }
    }, _callee4, null, [[1, 6]]);
  }));
  return _getOrderBookFromPoloniex.apply(this, arguments);
}
function savePoloniexCandlesForPair(_x4) {
  return _savePoloniexCandlesForPair.apply(this, arguments);
}
function _savePoloniexCandlesForPair() {
  _savePoloniexCandlesForPair = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee5(_ref) {
    var symbol, interval, filename, candleData, fileContent, parsedCandles, _t5;
    return _regenerator().w(function (_context5) {
      while (1) switch (_context5.p = _context5.n) {
        case 0:
          symbol = _ref.symbol, interval = _ref.interval;
          filename = "poloniex_candles_".concat(symbol, "_").concat(interval, ".json");
          candleData = [];
          _context5.p = 1;
          _context5.n = 2;
          return fs.readFile(filename, 'utf8');
        case 2:
          fileContent = _context5.v;
          candleData = JSON.parse(fileContent);
          parsedCandles = _PoloniexParser["default"].parseCandles(candleData); //console.log(parsedCandles, 'parsedCandles');
          filename = "poloniex_parsed_candles_".concat(symbol, "_").concat(interval, ".json");
          _context5.n = 3;
          return fs.writeFile(filename, JSON.stringify(parsedCandles, null, 2), 'utf8');
        case 3:
          console.log("Saved parsed candles to ".concat(filename));
          _context5.n = 5;
          break;
        case 4:
          _context5.p = 4;
          _t5 = _context5.v;
          console.log(_t5);
        case 5:
          return _context5.a(2);
      }
    }, _callee5, null, [[1, 4]]);
  }));
  return _savePoloniexCandlesForPair.apply(this, arguments);
}
module.exports = {
  getCryptoMarketPairsFromPoloniex: getCryptoMarketPairsFromPoloniex,
  getCryptoMarketPricesFromPoloniex: getCryptoMarketPricesFromPoloniex,
  getCandlestickDataFromPoloniex: getCandlestickDataFromPoloniex,
  savePoloniexCandlesForPair: savePoloniexCandlesForPair,
  getOrderBookFromPoloniex: getOrderBookFromPoloniex
};