"use strict";

var _topstocks = _interopRequireDefault(require("../models/topstocks.model"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t["return"] || t["return"](); } finally { if (u) throw o; } } }; }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
var fs = require('fs').promises;
var num = function num(v) {
  if (v == null) return null;
  var s = String(v).replace(/[, ]+/g, '').trim(); // remove commas
  if (s === '' || s.toLowerCase() === 'null') return null;
  var n = Number(s);
  return Number.isNaN(n) ? null : n;
};
function updateBiggestCompaniesStock() {
  return _updateBiggestCompaniesStock.apply(this, arguments);
}
function _updateBiggestCompaniesStock() {
  _updateBiggestCompaniesStock = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee() {
    var filename, fileContent, lines, stocksArr, key, map, _iterator, _step, r, stocks, stockMongooseOperations, _t;
    return _regenerator().w(function (_context) {
      while (1) switch (_context.p = _context.n) {
        case 0:
          _context.p = 0;
          filename = 'biggest-companies-stocks.csv';
          _context.n = 1;
          return fs.readFile(filename, 'utf8');
        case 1:
          fileContent = _context.v;
          lines = fileContent.split('\n').filter(function (line) {
            return line.trim() !== '';
          });
          stocksArr = lines.map(function (line) {
            var regex = /(".*?"|[^,]+)(?=\s*,|\s*$)/g;
            var parts = line.match(regex).map(function (p) {
              return p.replace(/^"|"$/g, '');
            });
            return {
              id: parts[0],
              symbol: parts[1],
              name: parts[2],
              sector: parts[3] || null,
              price: parts[4] ? parseFloat(parts[4]) : null,
              changePercent: parts[5] ? parts[5].trim() : null
            };
          }).filter(function (r) {
            return r.symbol && r.name;
          });
          key = function key(r) {
            return "".concat(r.symbol, "::").concat(r.name);
          };
          map = new Map();
          _iterator = _createForOfIteratorHelper(stocksArr);
          try {
            for (_iterator.s(); !(_step = _iterator.n()).done;) {
              r = _step.value;
              map.set(key(r), r);
            }
          } catch (err) {
            _iterator.e(err);
          } finally {
            _iterator.f();
          }
          stocks = Array.from(map.values());
          stockMongooseOperations = stocks.map(function (s) {
            return {
              updateOne: {
                filter: {
                  symbol: s.symbol,
                  name: s.name
                },
                update: {
                  $set: {
                    rank: s.rank,
                    marketCap: s.marketCap,
                    price: s.price,
                    changePercent: s.changePercent,
                    revenue: s.revenue,
                    lastUpdatedAt: s.lastUpdatedAt
                  },
                  $setOnInsert: {
                    symbol: s.symbol,
                    name: s.name
                  }
                },
                upsert: true
              }
            };
          });
          console.log(stockMongooseOperations);
          if (!stockMongooseOperations.length) {
            _context.n = 3;
            break;
          }
          _context.n = 2;
          return _topstocks["default"].bulkWrite(stockMongooseOperations, {
            ordered: false
          });
        case 2:
          console.log("Upserted/updated ".concat(stockMongooseOperations.length, " stocks."));
        case 3:
          return _context.a(2, stocks);
        case 4:
          _context.p = 4;
          _t = _context.v;
          console.log(_t);
        case 5:
          return _context.a(2);
      }
    }, _callee, null, [[0, 4]]);
  }));
  return _updateBiggestCompaniesStock.apply(this, arguments);
}
module.exports = {
  updateBiggestCompaniesStock: updateBiggestCompaniesStock
};