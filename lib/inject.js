"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var _1 = __importStar(require("./"));
_1.setStyles();
var injector = _1.default.injectEOSClient.bind(null);
_1.default.injectEOSClient = function (client) {
    injector(client);
    window.dispatchEvent(new Event("equilibrium:ready"));
};
window.Equilibrium = _1.default;
window.dispatchEvent(new Event("equilibrium:loaded"));
//# sourceMappingURL=inject.js.map