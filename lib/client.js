"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
var eosjs_1 = require("eosjs");
var core_1 = __importDefault(require("@scatterjs/core"));
var eosjs2_1 = __importDefault(require("@scatterjs/eosjs2"));
var network = {
    blockchain: "eos",
    protocol: "https",
    host: "api.eosn.io",
    port: 443,
    chainId: "aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906",
};
var EOSIOClient = (function () {
    function EOSIOClient(dappName) {
        var _this = this;
        this.init = function () { return __awaiter(_this, void 0, void 0, function () {
            var connectionOptions, connected;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        core_1.default.plugins(new eosjs2_1.default());
                        connectionOptions = { initTimeout: 15000, linkTimeout: 60000 };
                        return [4, core_1.default.scatter.connect(this.dappName, connectionOptions)];
                    case 1:
                        connected = _a.sent();
                        if (!connected) {
                            throw new Error("We couldn't connect to Scatter Desktop. Please setup scatter or install it.");
                        }
                        this.scatter = core_1.default.scatter;
                        this.api = this.scatter.eos(network, eosjs_1.Api, {
                            rpc: this.rpc,
                            beta3: true,
                        });
                        return [2];
                }
            });
        }); };
        this.getAccount = function () {
            return _this.scatter &&
                _this.scatter.identity &&
                _this.scatter.identity.accounts.find(function (x) { return x.blockchain === "eos"; });
        };
        this.connect = function () { return __awaiter(_this, void 0, void 0, function () {
            var requiredFields;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        requiredFields = { accounts: [network] };
                        return [4, this.scatter.getIdentity(requiredFields)];
                    case 1:
                        _a.sent();
                        return [2];
                }
            });
        }); };
        this.logout = function () { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.scatter) return [3, 2];
                        return [4, this.scatter.forgetIdentity()];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2: return [2];
                }
            });
        }); };
        var protocol = network.protocol, host = network.host, port = network.port;
        this.dappName = dappName;
        this.rpc = new eosjs_1.JsonRpc(protocol + "://" + host + ":" + port);
        window.ScatterJS = null;
    }
    return EOSIOClient;
}());
exports.default = EOSIOClient;
//# sourceMappingURL=client.js.map