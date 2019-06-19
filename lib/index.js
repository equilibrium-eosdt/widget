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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var eosjs_1 = require("eosjs");
var events_1 = require("events");
var globals_1 = require("./globals");
var position_1 = __importDefault(require("./position"));
var styles_1 = require("./styles");
exports.setStyles = styles_1.setStyles;
var widget_1 = require("./widget");
var CreatePosition = {
    state: {
        loggedIn: false,
    },
    onInit: function (w) { return __awaiter(_this, void 0, void 0, function () {
        var _a, events, client;
        return __generator(this, function (_b) {
            _a = w.ctx, events = _a.events, client = _a.client;
            events.on("account", function (state) {
                var loggedIn = state.loggedIn;
                w.update({ loggedIn: loggedIn });
            });
            if (!client) {
                throw new Error(globals_1.t(templateObject_1 || (templateObject_1 = __makeTemplateObject(["Missing EOS client"], ["Missing EOS client"]))));
            }
            if (client.getAccount()) {
                w.update({ loggedIn: true });
            }
            return [2];
        });
    }); },
    render: function (state, r) {
        return r(templateObject_2 || (templateObject_2 = __makeTemplateObject(["", ""], ["",
            ""])), state.loggedIn && {
            id: "position",
            className: "equil-position-manage",
            type: position_1.default,
        });
    },
};
var iframeOptions = {
    accountName: "",
    endpoint: "",
};
var context = {
    events: new events_1.EventEmitter(),
};
var Equilibrium = {
    iframeMode: false,
    isReady: function () { return !!context.client; },
    init: init,
    setLocale: globals_1.setLocale,
    injectEOSClient: function (client) {
        context.client = client;
    },
    getContext: function () { return context; },
    Widgets: {
        Position: injectPositionWidget,
    },
};
function injectPositionWidget(el) {
    if (!el) {
        return null;
    }
    if (Equilibrium.iframeMode) {
        el.innerHTML = "<iframe src=\"https://cdn.eosdt.com/widget/iframe.html#" + iframeOptions.accountName + "@" + iframeOptions.endpoint + "\"></iframe>";
        return null;
    }
    else {
        styles_1.setContainerStyle(el);
        return new widget_1.Widget(el, CreatePosition, context);
    }
}
function init(accountName, endpoint, onTransaction) {
    var _this = this;
    if (Equilibrium.iframeMode) {
        iframeOptions.accountName = accountName;
        iframeOptions.endpoint = endpoint;
        window.addEventListener("message", function (e) { return __awaiter(_this, void 0, void 0, function () {
            var data, tx, opt, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!e.data) return [3, 5];
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 4, , 5]);
                        data = JSON.parse(e.data);
                        tx = data.tx, opt = data.opt;
                        if (!tx) return [3, 3];
                        return [4, onTransaction(tx, opt)];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3: return [3, 5];
                    case 4:
                        err_1 = _a.sent();
                        return [3, 5];
                    case 5: return [2];
                }
            });
        }); });
    }
    else {
        Equilibrium.injectEOSClient({
            getAccount: function () { return ({
                name: accountName,
            }); },
            rpc: new eosjs_1.JsonRpc(endpoint),
            api: {
                transact: function (txObj, options) { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4, onTransaction(txObj, options)];
                        case 1: return [2, _a.sent()];
                    }
                }); }); },
            },
        });
    }
}
exports.default = Equilibrium;
var templateObject_1, templateObject_2;
//# sourceMappingURL=index.js.map