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
var globals_1 = require("../globals");
function Tabs(params) {
    var _this = this;
    var id = params.id, tabs = params.tabs, className = params.className;
    var type = {
        state: { tabIndex: 0 },
        onInit: function (w) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (!tabs.every(function (_a, i) {
                    var id = _a.id;
                    var el = w.find("." + id + "-tab");
                    if (!el) {
                        return false;
                    }
                    el.addEventListener("click", w.update.bind(w, { tabIndex: i }));
                    return true;
                })) {
                    throw new Error('Not all tabs processed');
                }
                return [2];
            });
        }); },
        onUpdate: function (w) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (!tabs.every(function (_a, i) {
                    var id = _a.id;
                    var el = w.find("." + id + "-tab");
                    if (!el) {
                        return false;
                    }
                    el.addEventListener("click", w.update.bind(w, { tabIndex: i }));
                    return true;
                })) {
                    throw new Error(globals_1.t(templateObject_1 || (templateObject_1 = __makeTemplateObject(["Not all tabs processed"], ["Not all tabs processed"]))));
                }
                return [2];
            });
        }); },
        render: function (state, r) {
            var tab = tabs[state.tabIndex];
            return r(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n      <div class=\"position-manage__tabs-wrapper\">\n        <!-- span>I want to </span -->\n        <div class=\"position-manage__dropdownMenu\">\n          <!-- div class=\"position-manage__activeTab\">\n          ", "\n          </div -->\n          <ul class=\"position-manage__tabs\">\n            ", "\n          </ul>\n        </div>\n      </div>\n  ", "\n"], ["\n      <div class=\"position-manage__tabs-wrapper\">\n        <!-- span>I want to </span -->\n        <div class=\"position-manage__dropdownMenu\">\n          <!-- div class=\"position-manage__activeTab\">\n          ", "\n          </div -->\n          <ul class=\"position-manage__tabs\">\n            ",
                "\n          </ul>\n        </div>\n      </div>\n  ", "\n"])), '', tabs.map(function (_a, index) {
                var id = _a.id, name = _a.name;
                return r(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n              <li class=\"", "", "-tab position-manage__tab\">\n                ", "\n              </li>\n          "], ["\n              <li class=\"", "", "-tab position-manage__tab\">\n                ", "\n              </li>\n          "])), index === state.tabIndex ? "position-manage__tab--active " : "", id, typeof name === "function" ? name() : name);
            }).join(''), { id: tab.id, type: tab.type });
        }
    };
    return { id: id, type: type, className: className };
}
exports.default = Tabs;
var templateObject_1, templateObject_2, templateObject_3;
//# sourceMappingURL=tabs.js.map