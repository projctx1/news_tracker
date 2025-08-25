"use strict";

var _scrappeddatafile = _interopRequireDefault(require("../models/scrappeddatafile.model"));
var _scraperurl = _interopRequireDefault(require("../models/scraperurl.model"));
var _logError = _interopRequireDefault(require("./logError"));
var _s3upload = _interopRequireDefault(require("./s3upload"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
var puppeteer = require('puppeteer');
var fs = require('fs');
var urlModule = require('url');
//need a user agents and browser settings module for randomizing browser settings and user agents per call to the same url
function getApex(url) {
  var _URL = new URL(url),
    hostname = _URL.hostname;
  return hostname.replace(/^www\./, '');
}
function runScrapper() {
  return _runScrapper.apply(this, arguments);
}
function _runScrapper() {
  _runScrapper = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2() {
    var urls;
    return _regenerator().w(function (_context2) {
      while (1) switch (_context2.n) {
        case 0:
          urls = ['https://stockanalysis.com/news/'];
          _context2.n = 1;
          return Promise.all(urls.map(/*#__PURE__*/function () {
            var _ref2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(url) {
              var urlapex, existing, _t;
              return _regenerator().w(function (_context) {
                while (1) switch (_context.p = _context.n) {
                  case 0:
                    urlapex = getApex(url);
                    _context.n = 1;
                    return _scraperurl["default"].findOne({
                      url: url
                    });
                  case 1:
                    existing = _context.v;
                    _context.p = 2;
                    if (existing) {
                      _context.n = 4;
                      break;
                    }
                    existing = new _scraperurl["default"]({
                      url: url,
                      urlapex: urlapex
                    });
                    _context.n = 3;
                    return existing.save();
                  case 3:
                    console.log("\u2705 Created new ScraperURL for: ".concat(url));
                  case 4:
                    _context.n = 6;
                    break;
                  case 5:
                    _context.p = 5;
                    _t = _context.v;
                    (0, _logError["default"])({
                      errorDescription: "Error from runScrapper function",
                      error: _t
                    });
                  case 6:
                    scrapUrlAndSaveToDb({
                      url: url,
                      urlSource: existing._id
                    });
                  case 7:
                    return _context.a(2);
                }
              }, _callee, null, [[2, 5]]);
            }));
            return function (_x2) {
              return _ref2.apply(this, arguments);
            };
          }()));
        case 1:
          return _context2.a(2);
      }
    }, _callee2);
  }));
  return _runScrapper.apply(this, arguments);
}
function scrapUrlAndSaveToDb(_x) {
  return _scrapUrlAndSaveToDb.apply(this, arguments);
}
function _scrapUrlAndSaveToDb() {
  _scrapUrlAndSaveToDb = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3(_ref) {
    var url, urlSource, browser, page, bodyContent, subLinks, parsedUrl, newScrappedDataFile, fileName, Body, ContentType, folder, scrappedDataFileUrl, _t2;
    return _regenerator().w(function (_context3) {
      while (1) switch (_context3.p = _context3.n) {
        case 0:
          url = _ref.url, urlSource = _ref.urlSource;
          _context3.p = 1;
          _context3.n = 2;
          return puppeteer.launch({
            headless: 'new',
            executablePath: process.env.PUPPETEER_EXECUTABLE_PATH,
            args: ['--no-sandbox', '--disable-setuid-sandbox']
          });
        case 2:
          browser = _context3.v;
          _context3.n = 3;
          return browser.newPage();
        case 3:
          page = _context3.v;
          _context3.n = 4;
          return page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36');
        case 4:
          _context3.n = 5;
          return page["goto"](url, {
            waitUntil: 'domcontentloaded'
          });
        case 5:
          _context3.n = 6;
          return page.evaluate(function () {
            return document.body.outerHTML;
          });
        case 6:
          bodyContent = _context3.v;
          _context3.n = 7;
          return page.evaluate(function () {
            return Array.from(document.querySelectorAll('a')).map(function (a) {
              return {
                text: a.innerText.trim(),
                href: a.href
              };
            }).filter(function (link) {
              return link.href;
            });
          });
        case 7:
          subLinks = _context3.v;
          parsedUrl = urlModule.parse(url);
          console.log(parsedUrl);

          //_${parsedUrl.hostname.replace(/\./g, '_')}${parsedUrl.pathname.replace(/\//g, '_')
          newScrappedDataFile = new _scrappeddatafile["default"]({
            urlSource: urlSource,
            subLinks: subLinks
          }); //console.log(newScrappedDataFile)
          fileName = "".concat(newScrappedDataFile._id);
          Body = Buffer.from(bodyContent, "utf8");
          ContentType = "text/html; charset=utf-8";
          folder = 'scrappedhtml'; //console.log(fileName, Body, ContentType, folder)
          _context3.n = 8;
          return (0, _s3upload["default"])({
            Body: Body,
            ContentType: ContentType,
            folder: folder,
            fileName: "".concat(fileName, ".html")
          });
        case 8:
          scrappedDataFileUrl = _context3.v;
          newScrappedDataFile.url = scrappedDataFileUrl;
          _context3.n = 9;
          return newScrappedDataFile.save();
        case 9:
          console.log(newScrappedDataFile);

          //fs.writeFileSync(`${fileName}.html`, bodyContent, 'utf8');

          //fs.writeFileSync(`${fileName}.txt`, bodyContent, 'utf8');
          _context3.n = 10;
          return browser.close();
        case 10:
          _context3.n = 12;
          break;
        case 11:
          _context3.p = 11;
          _t2 = _context3.v;
          (0, _logError["default"])({
            errorDescription: "Error from scrapUrlAndSaveToDb function",
            error: _t2
          });
        case 12:
          return _context3.a(2);
      }
    }, _callee3, null, [[1, 11]]);
  }));
  return _scrapUrlAndSaveToDb.apply(this, arguments);
}
module.exports = {
  runScrapper: runScrapper
};