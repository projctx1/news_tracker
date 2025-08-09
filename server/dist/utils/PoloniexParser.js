"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var PoloniexParser = /*#__PURE__*/function () {
  function PoloniexParser() {
    _classCallCheck(this, PoloniexParser);
  }
  return _createClass(PoloniexParser, null, [{
    key: "parseCandle",
    value: function parseCandle(entry) {
      return {
        // order per docs:
        // [low, high, open, close, amount, quantity, buyTakerAmount, buyTakerQuantity, tradeCount, ts, weightedAverage, interval, startTime, closeTime]
        low: parseFloat(entry[0]),
        high: parseFloat(entry[1]),
        open: parseFloat(entry[2]),
        close: parseFloat(entry[3]),
        amount: parseFloat(entry[4]),
        // quote volume
        quantity: parseFloat(entry[5]),
        // base volume
        buyTakerAmount: parseFloat(entry[6]),
        // quote volume (buy-taker)
        buyTakerQuantity: parseFloat(entry[7]),
        // base volume (buy-taker)
        tradeCount: Number(entry[8]),
        ts: Number(entry[9]),
        weightedAverage: parseFloat(entry[10]),
        interval: entry[11],
        startTime: Number(entry[12]),
        closeTime: Number(entry[13])
      };
    }
  }, {
    key: "parseCandles",
    value: function parseCandles(data) {
      return data.map(function (candle) {
        return PoloniexParser.toLightweightCandle(PoloniexParser.parseCandle(candle));
      });
    }
  }, {
    key: "toLightweightCandle",
    value: function toLightweightCandle(parsed) {
      var timestamp = Number(parsed.startTime);

      // Create a new Date object from the timestamp (milliseconds)
      var dateObject = new Date(timestamp);

      // Extract the year, month, and day
      var year = dateObject.getFullYear();
      var month = String(dateObject.getMonth() + 1).padStart(2, '0'); // getMonth() is 0-indexed, so add 1
      var day = String(dateObject.getDate()).padStart(2, '0');

      // Combine them into the desired format
      var formattedDate = "".concat(year, "-").concat(month, "-").concat(day);
      console.log(Number(parsed.startTime), formattedDate);
      return {
        time: parsed.startTime,
        // parsed.startTime,
        open: parsed.open,
        high: parsed.high,
        low: parsed.low,
        close: parsed.close
      };
    }
  }]);
}();
var _default = exports["default"] = PoloniexParser;