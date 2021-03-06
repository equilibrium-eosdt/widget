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
Object.defineProperty(exports, "__esModule", { value: true });
var globals_1 = require("../globals");
var form_1 = __importDefault(require("../ui/form"));
function CreatePosition(deps) {
    var _this = this;
    var account = deps.account, contract = deps.contract;
    return {
        state: {},
        onInit: function (w) { return __awaiter(_this, void 0, void 0, function () {
            var events;
            var _this = this;
            return __generator(this, function (_a) {
                events = w.ctx.events;
                w.update({
                    form: form_1.default({
                        id: "create-position",
                        className: "equil-position-manage__form",
                        fields: {
                            deposit: {
                                decimals: 4,
                                label: globals_1.t(templateObject_1 || (templateObject_1 = __makeTemplateObject(["I want to deposit EOS"], ["I want to deposit EOS"]))),
                            },
                            generate: {
                                decimals: 2,
                                label: globals_1.t(templateObject_2 || (templateObject_2 = __makeTemplateObject(["And generate EOSDT"], ["And generate EOSDT"]))),
                            },
                        },
                        handler: function (data) { return __awaiter(_this, void 0, void 0, function () {
                            var _a, deposit, generate;
                            return __generator(this, function (_b) {
                                switch (_b.label) {
                                    case 0:
                                        if (!data) return [3, 4];
                                        _a = [
                                            Number(data.get("deposit")),
                                            Number(data.get("generate")),
                                        ], deposit = _a[0], generate = _a[1];
                                        if (!(Number.isFinite(deposit) &&
                                            deposit > 0 &&
                                            Number.isFinite(generate) &&
                                            generate > 0)) return [3, 2];
                                        return [4, contract.create(account.name, deposit, generate)];
                                    case 1:
                                        _b.sent();
                                        events.emit("position:created");
                                        return [3, 3];
                                    case 2: throw new Error(globals_1.t(templateObject_3 || (templateObject_3 = __makeTemplateObject(["Wrong data"], ["Wrong data"]))));
                                    case 3: return [3, 5];
                                    case 4: throw new Error(globals_1.t(templateObject_4 || (templateObject_4 = __makeTemplateObject(["No data"], ["No data"]))));
                                    case 5: return [2];
                                }
                            });
                        }); },
                    }),
                });
                return [2];
            });
        }); },
        render: function (state, r) {
            return r(templateObject_5 || (templateObject_5 = __makeTemplateObject(["", ""], ["", ""])), state.form);
        },
    };
}
exports.default = CreatePosition;
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5;
//# sourceMappingURL=create.js.map