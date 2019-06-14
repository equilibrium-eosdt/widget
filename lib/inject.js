"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var _1 = __importDefault(require("./"));
var injector = _1.default.injectEOSClient.bind(null);
_1.default.injectEOSClient = function (client) {
    injector(client);
    window.dispatchEvent(new Event("equilibrium:ready"));
};
window.Equilibrium = _1.default;
window.dispatchEvent(new Event("equilibrium:loaded"));
//# sourceMappingURL=inject.js.map