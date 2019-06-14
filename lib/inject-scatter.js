"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var client_1 = __importDefault(require("./client"));
var login_1 = __importDefault(require("./scatter/login"));
var widget_1 = require("./widget");
var _1 = __importDefault(require("./"));
var Scatter = {
    state: {},
    render: function (_, r) {
        return r(templateObject_1 || (templateObject_1 = __makeTemplateObject(["", ""], ["", ""])), { id: "scatter", className: "scatter-auth", type: login_1.default });
    },
};
var client = new client_1.default("eosdt");
var context = _1.default.getContext();
var injector = _1.default.injectEOSClient.bind(null);
_1.default.injectEOSClient = function (client) {
    injector(client);
    window.dispatchEvent(new Event("equilibrium:ready"));
};
_1.default.Widgets.Scatter = function (el) {
    if (!el) {
        return null;
    }
    return new widget_1.Widget(el, Scatter, context);
};
window.Equilibrium = _1.default;
window.dispatchEvent(new Event("equilibrium:loaded"));
_1.default.injectEOSClient(client);
var templateObject_1;
//# sourceMappingURL=inject-scatter.js.map