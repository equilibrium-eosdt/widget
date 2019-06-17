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
var positions_1 = require("@eosdt/eosdt-js/dist/positions");
var globals_1 = require("../globals");
var ui_1 = require("../ui");
var create_1 = __importDefault(require("./create"));
var deposit_1 = __importDefault(require("./deposit"));
var withdraw_1 = __importDefault(require("./withdraw"));
var generate_1 = __importDefault(require("./generate"));
var payback_1 = __importDefault(require("./payback"));
var ManagePosition = {
    state: {},
    onInit: function (w) { return __awaiter(_this, void 0, void 0, function () {
        var _a, client, events, rawAccount, account, contract, name, params, positions, rates, settings, balance, tabs;
        var _this = this;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = w.ctx, client = _a.client, events = _a.events;
                    rawAccount = client.getAccount();
                    if (!rawAccount) {
                        throw new Error(globals_1.t(templateObject_1 || (templateObject_1 = __makeTemplateObject(["No account"], ["No account"]))));
                    }
                    account = rawAccount;
                    contract = new positions_1.PositionsContract(client);
                    name = account.name;
                    return [4, contract.getParameters()];
                case 1:
                    params = _b.sent();
                    return [4, contract.getAllUserPositions(name)];
                case 2:
                    positions = _b.sent();
                    return [4, contract.getRates()];
                case 3:
                    rates = _b.sent();
                    return [4, contract.getSettings()];
                case 4:
                    settings = _b.sent();
                    return [4, client.rpc.get_currency_balance("eosio.token", "eosdtcntract", "EOS")];
                case 5:
                    balance = _b.sent();
                    tabs = ui_1.Tabs({
                        id: "tabs",
                        className: "tab-container",
                        tabs: [
                            {
                                id: "deposit",
                                name: function () { return globals_1.t(templateObject_2 || (templateObject_2 = __makeTemplateObject(["Deposit"], ["Deposit"]))); },
                                type: deposit_1.default({ account: account, contract: contract }),
                            },
                            {
                                id: "withdraw",
                                name: function () { return globals_1.t(templateObject_3 || (templateObject_3 = __makeTemplateObject(["Withdraw"], ["Withdraw"]))); },
                                type: withdraw_1.default({ account: account, contract: contract }),
                            },
                            {
                                id: "generate",
                                name: function () { return globals_1.t(templateObject_4 || (templateObject_4 = __makeTemplateObject(["Generate"], ["Generate"]))); },
                                type: generate_1.default({ account: account, contract: contract }),
                            },
                            {
                                id: "payback",
                                name: function () { return globals_1.t(templateObject_5 || (templateObject_5 = __makeTemplateObject(["Payback"], ["Payback"]))); },
                                type: payback_1.default({ account: account, contract: contract }),
                            },
                        ],
                    });
                    w.update({
                        account: account,
                        positions: positions,
                        contract: contract,
                        tabs: tabs,
                        params: params,
                        rates: rates,
                        settings: settings,
                        balance: balance,
                    });
                    events.on("position:created", function () { return __awaiter(_this, void 0, void 0, function () {
                        var positions, rates;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4, contract.getAllUserPositions(name)];
                                case 1:
                                    positions = _a.sent();
                                    return [4, contract.getRates()];
                                case 2:
                                    rates = _a.sent();
                                    w.update({ positions: positions, rates: rates });
                                    return [2];
                            }
                        });
                    }); });
                    events.on("transaction", function () { return __awaiter(_this, void 0, void 0, function () {
                        var positions, rates;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4, contract.getAllUserPositions(name)];
                                case 1:
                                    positions = _a.sent();
                                    return [4, contract.getRates()];
                                case 2:
                                    rates = _a.sent();
                                    w.update({ positions: positions, rates: rates });
                                    return [2];
                            }
                        });
                    }); });
                    return [2];
            }
        });
    }); },
    render: function (state, r) {
        var params = state.params, account = state.account, positions = state.positions, contract = state.contract, rates = state.rates, settings = state.settings, balance = state.balance;
        if (!account) {
            return globals_1.t(templateObject_6 || (templateObject_6 = __makeTemplateObject(["Waiting for account..."], ["Waiting for account..."])));
        }
        if (!contract) {
            return globals_1.t(templateObject_7 || (templateObject_7 = __makeTemplateObject(["Waiting for contract..."], ["Waiting for contract..."])));
        }
        if (!params) {
            return globals_1.t(templateObject_8 || (templateObject_8 = __makeTemplateObject(["Waiting for params..."], ["Waiting for params..."])));
        }
        if (!rates) {
            return globals_1.t(templateObject_9 || (templateObject_9 = __makeTemplateObject(["Waiting for rates..."], ["Waiting for rates..."])));
        }
        if (!balance || !balance[0]) {
            return globals_1.t(templateObject_10 || (templateObject_10 = __makeTemplateObject(["Waiting for contract balance..."], ["Waiting for contract balance..."])));
        }
        if (!Array.isArray(positions) || positions.length < 1) {
            return r(templateObject_14 || (templateObject_14 = __makeTemplateObject(["\n      <div class=\"position-actions\">\n        <h2 class=\"position-manage__title\">", "</h2>", "\n      </div>\n      <div class=\"position-parameters position-parameters--empty\">\n        <h2 class=\"position-manage__title\">", "</h2>\n          <span class=\"position-parameters__title\">", "</span>\n      </div>"], ["\n      <div class=\"position-actions\">\n        <h2 class=\"position-manage__title\">", "</h2>",
                "\n      </div>\n      <div class=\"position-parameters position-parameters--empty\">\n        <h2 class=\"position-manage__title\">", "</h2>\n          <span class=\"position-parameters__title\">", "</span>\n      </div>"])), globals_1.t(templateObject_11 || (templateObject_11 = __makeTemplateObject(["Create position"], ["Create position"]))), {
                id: "create-position",
                type: create_1.default({ account: account, contract: contract }),
            }, globals_1.t(templateObject_12 || (templateObject_12 = __makeTemplateObject(["You don't have any positions yet"], ["You don't have any positions yet"]))), globals_1.t(templateObject_13 || (templateObject_13 = __makeTemplateObject(["Deposit collateral and generate <br/>debt to get started"], ["Deposit collateral and generate <br/>debt to get started"]))));
        }
        var rate = rates.find(function (rate) { return rate.rate.indexOf("USD") >= 0; });
        if (!rate) {
            throw new Error(globals_1.t(templateObject_15 || (templateObject_15 = __makeTemplateObject(["No USD rate"], ["No USD rate"]))));
        }
        var stability_rate = params.stability_rate;
        var _a = state.positions[0], outstanding = _a.outstanding, collateral = _a.collateral;
        var k = parseFloat(balance[0]) / parseFloat(params.total_collateral);
        var eos = parseFloat(collateral) * k;
        var eosdt = parseFloat(outstanding) * parseFloat(stability_rate);
        var usd = eos * parseFloat(rate.rate);
        var minLtv = parseFloat(settings.critical_ltv);
        var ltv = usd / eosdt;
        var minRate = minLtv * eosdt / eos;
        var maxEos = (usd - eosdt * minLtv) / parseFloat(rate.rate);
        var maxEosdt = (usd - minLtv * eosdt) / minLtv;
        return r(templateObject_24 || (templateObject_24 = __makeTemplateObject(["\n      <div class=\"position-actions\">\n        <h2 class=\"position-manage__title\">\n          ", "\n        </h2>\n        <div class=\"position-actions__labels\">\n          <div class=\"position-actions__label\">\n            <span>", "</span>\n            <span class=\"position-actions__value\">", "</span>\n          </div>\n          <div class=\"position-actions__label\">\n            <span>", "</span>\n            <span class=\"position-actions__value\">", "</span>\n          </div>\n        </div>\n        ", "\n      </div>\n      <div class=\"position-parameters\">\n        <h2 class=\"position-manage__title\">", "</h2>\n        <div class=\"position-parameters__item\">\n          <span class=\"position-parameters__title\">", "</span>\n          <span class=\"position-parameters__value\">", "%</span>\n        </div>\n        <div class=\"position-parameters__item\">\n          <span class=\"position-parameters__title\">", "</span>\n          <span class=\"position-parameters__value\">", "$</span>\n        </div>\n        <div class=\"position-parameters__item\">\n          <span class=\"position-parameters__title\">", "</span>\n          <span class=\"position-parameters__value\">", " EOS</span>\n        </div>\n        <div class=\"position-parameters__item\">\n          <span class=\"position-parameters__title\">", "</span>\n          <span class=\"position-parameters__value\">", " EOSDT</span>\n        </div>\n      </div>\n"], ["\n      <div class=\"position-actions\">\n        <h2 class=\"position-manage__title\">\n          ",
            "\n        </h2>\n        <div class=\"position-actions__labels\">\n          <div class=\"position-actions__label\">\n            <span>", "</span>\n            <span class=\"position-actions__value\">", "</span>\n          </div>\n          <div class=\"position-actions__label\">\n            <span>", "</span>\n            <span class=\"position-actions__value\">", "</span>\n          </div>\n        </div>\n        ", "\n      </div>\n      <div class=\"position-parameters\">\n        <h2 class=\"position-manage__title\">", "</h2>\n        <div class=\"position-parameters__item\">\n          <span class=\"position-parameters__title\">", "</span>\n          <span class=\"position-parameters__value\">", "%</span>\n        </div>\n        <div class=\"position-parameters__item\">\n          <span class=\"position-parameters__title\">", "</span>\n          <span class=\"position-parameters__value\">", "$</span>\n        </div>\n        <div class=\"position-parameters__item\">\n          <span class=\"position-parameters__title\">", "</span>\n          <span class=\"position-parameters__value\">", " EOS</span>\n        </div>\n        <div class=\"position-parameters__item\">\n          <span class=\"position-parameters__title\">", "</span>\n          <span class=\"position-parameters__value\">", " EOSDT</span>\n        </div>\n      </div>\n"])), globals_1.t(templateObject_16 || (templateObject_16 = __makeTemplateObject(["Manage position of <i class=\"position-manage__username\">", "</i>"], ["Manage position of <i class=\"position-manage__username\">",
            "</i>"])), account.name), globals_1.t(templateObject_17 || (templateObject_17 = __makeTemplateObject(["Collateral EOS"], ["Collateral EOS"]))), eos.toFixed(4), globals_1.t(templateObject_18 || (templateObject_18 = __makeTemplateObject(["Debt EOSDT"], ["Debt EOSDT"]))), eosdt.toFixed(2), state.tabs, globals_1.t(templateObject_19 || (templateObject_19 = __makeTemplateObject(["Position parameters"], ["Position parameters"]))), globals_1.t(templateObject_20 || (templateObject_20 = __makeTemplateObject(["Collateralization ratio:"], ["Collateralization ratio:"]))), (ltv * 100).toFixed(), globals_1.t(templateObject_21 || (templateObject_21 = __makeTemplateObject(["Liquidation price:"], ["Liquidation price:"]))), minRate.toFixed(2), globals_1.t(templateObject_22 || (templateObject_22 = __makeTemplateObject(["Max EOS to withdraw:"], ["Max EOS to withdraw:"]))), maxEos.toFixed(4), globals_1.t(templateObject_23 || (templateObject_23 = __makeTemplateObject(["Max EOSDT to generate:"], ["Max EOSDT to generate:"]))), maxEosdt.toFixed(2));
    },
};
exports.default = ManagePosition;
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5, templateObject_6, templateObject_7, templateObject_8, templateObject_9, templateObject_10, templateObject_11, templateObject_12, templateObject_13, templateObject_14, templateObject_15, templateObject_16, templateObject_17, templateObject_18, templateObject_19, templateObject_20, templateObject_21, templateObject_22, templateObject_23, templateObject_24;
//# sourceMappingURL=index.js.map