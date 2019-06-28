"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
function Rates(deps) {
    var _this = this;
    return {
        state: {},
        onInit: function (w) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                setInterval(function () { return w.update(); }, 60000);
                return [2];
            });
        }); },
        render: function (state, r) {
            var getRates = deps.getRates;
            var rates = getRates && getRates();
            console.log(state);
            var balanceToNumber = function (balance) {
                if (balance === undefined)
                    balance = "";
                var x = balance.match(/[0-9,\.]+/g);
                if (x === null)
                    return 0;
                return Number(x[0]);
            };
            var eosUsdRate;
            var nutUsdRate;
            if (rates.length) {
                nutUsdRate = (balanceToNumber(rates[1].rate) * 100).toFixed(2);
                eosUsdRate = balanceToNumber(rates[0].rate).toFixed(2);
            }
            return r(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n      <div class=\"equil-rates__item\">\n        <img class=\"equil-rates__img\" src=\"public/img/EOS.svg\" alt=\"EOS\" />\n        <div class=\"equil-rates__values\">\n            <span>EOS</span>\n            <span>$", "</span>\n        </div>\n      </div>\n\n      <div class=\"equil-rates__item\">\n        <img class=\"equil-rates__img\" src=\"public/img/NUT.svg\" alt=\"NUT\" />\n        <div class=\"equil-rates__values\">\n            <span>NUT</span>\n            <span>$", "</span>\n        </div>\n      </div>\n      "], ["\n      <div class=\"equil-rates__item\">\n        <img class=\"equil-rates__img\" src=\"public/img/EOS.svg\" alt=\"EOS\" />\n        <div class=\"equil-rates__values\">\n            <span>EOS</span>\n            <span>$", "</span>\n        </div>\n      </div>\n\n      <div class=\"equil-rates__item\">\n        <img class=\"equil-rates__img\" src=\"public/img/NUT.svg\" alt=\"NUT\" />\n        <div class=\"equil-rates__values\">\n            <span>NUT</span>\n            <span>$", "</span>\n        </div>\n      </div>\n      "])), eosUsdRate || "0", nutUsdRate || "0");
        },
    };
}
exports.default = Rates;
var templateObject_1;
//# sourceMappingURL=rates.js.map