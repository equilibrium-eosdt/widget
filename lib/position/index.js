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
var parameters_1 = __importDefault(require("./parameters"));
var deposit_1 = __importDefault(require("./deposit"));
var withdraw_1 = __importDefault(require("./withdraw"));
var generate_1 = __importDefault(require("./generate"));
var payback_1 = __importDefault(require("./payback"));
var balances_1 = __importDefault(require("./balances"));
var rates_1 = __importDefault(require("./rates"));
var ManagePosition = {
    state: {
        eos: 0,
        eosdt: 0,
        minLtv: 1.7,
    },
    onInit: function (w) { return __awaiter(_this, void 0, void 0, function () {
        var _a, client, events, rawAccount, account, contract, name, params, positions, rates, settings, balance, userBalanceArray, userBalanceEos, EosRate, NutRate, nutBalance, userBalanceNut, eosdtBalance, userBalanceEosdt, getNUTAmount, createPosition, parameters, userBalances, currencyRates, tabs;
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
                    return [4, client.rpc.get_currency_balance("eosio.token", "" + account.name, "EOS")];
                case 6:
                    userBalanceArray = _b.sent();
                    userBalanceEos = userBalanceArray
                        ? parseFloat(userBalanceArray[0])
                        : 0;
                    EosRate = rates ? parseFloat(rates[0].rate) : 0;
                    NutRate = rates ? parseFloat(rates[1].rate) : 0;
                    return [4, client.rpc.get_currency_balance("eosdtnutoken", "" + account.name, "NUT")];
                case 7:
                    nutBalance = _b.sent();
                    userBalanceNut = nutBalance.length ? parseFloat(nutBalance[0]) : 0;
                    return [4, client.rpc.get_currency_balance("eosdtsttoken", "" + account.name, "EOSDT")];
                case 8:
                    eosdtBalance = _b.sent();
                    userBalanceEosdt = eosdtBalance.length
                        ? parseFloat(eosdtBalance[0])
                        : 0;
                    getNUTAmount = function (value) {
                        if (!positions || !params) {
                            return 0;
                        }
                        var governance = parseFloat(positions[0].governance) * Number(params.governance_rate);
                        var outstanding = parseFloat(positions[0].outstanding) * Number(params.stability_rate);
                        var outstanding_delta = outstanding / Number(params.stability_rate);
                        var nutAmount = value * (governance - outstanding) / outstanding;
                        if (outstanding_delta > Number(positions[0].outstanding)) {
                            nutAmount = governance - outstanding;
                        }
                        nutAmount = nutAmount / (Number(EosRate) / Number(NutRate));
                        return nutAmount;
                    };
                    createPosition = {
                        id: "create-position",
                        type: create_1.default({ account: account, contract: contract }),
                    };
                    parameters = {
                        id: "parameters",
                        className: "equil-position-parameters",
                        type: parameters_1.default({
                            getLtv: function (dEos, dEosdt) {
                                var eos = dEos + w.state.eos;
                                var eosdt = dEosdt + w.state.eosdt;
                                var rates = w.state.rates;
                                var rate = rates.find(function (rate) { return rate.rate.indexOf("USD") >= 0; });
                                if (!rate || !eosdt) {
                                    return 0;
                                }
                                var usd = eos * parseFloat(rate.rate);
                                return eosdt !== 0 ? usd / eosdt : 0;
                            },
                            getMinRate: function (dEos, dEosdt) {
                                var eos = dEos + w.state.eos;
                                var eosdt = dEosdt + w.state.eosdt;
                                return w.state.minLtv * eosdt / eos;
                            },
                            getMaxEos: function (dEos, dEosdt) {
                                var eos = dEos + w.state.eos;
                                var eosdt = dEosdt + w.state.eosdt;
                                var _a = w.state, rates = _a.rates, minLtv = _a.minLtv;
                                var rate = rates.find(function (rate) { return rate.rate.indexOf("USD") >= 0; });
                                if (!rate || !eosdt) {
                                    return 0;
                                }
                                var usd = eos * parseFloat(rate.rate);
                                return (usd - eosdt * minLtv) / parseFloat(rate.rate);
                            },
                            getMaxEosdt: function (dEos, dEosdt) {
                                var eos = dEos + w.state.eos;
                                var eosdt = dEosdt + w.state.eosdt;
                                var _a = w.state, rates = _a.rates, minLtv = _a.minLtv;
                                var rate = rates.find(function (rate) { return rate.rate.indexOf("USD") >= 0; });
                                if (!rate || !eosdt) {
                                    return 0;
                                }
                                var usd = eos * parseFloat(rate.rate);
                                return (usd - minLtv * eosdt) / minLtv;
                            },
                        }),
                    };
                    userBalances = {
                        id: "balances",
                        className: "equil-user-balances",
                        type: balances_1.default({
                            getUserBalanceEos: function () { return w.state.userBalanceEos || 0; },
                            getUserBalanceEosdt: function () { return w.state.userBalanceEosdt || 0; },
                            getUserBalanceNut: function () { return w.state.userBalanceNut || 0; },
                            getRates: function () { return w.state.rates; },
                        }),
                    };
                    currencyRates = {
                        id: "rates",
                        className: "equil-rates",
                        type: rates_1.default({
                            getRates: function () { return w.state.rates; },
                        }),
                    };
                    tabs = ui_1.Tabs({
                        id: "tabs",
                        className: "equil-position-manage__tab-container",
                        onSelect: function () { return __awaiter(_this, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                w.ctx.events.emit("eos:update", 0);
                                return [2];
                            });
                        }); },
                        tabs: [
                            {
                                id: "deposit",
                                name: function () { return globals_1.t(templateObject_2 || (templateObject_2 = __makeTemplateObject(["Pledge"], ["Pledge"]))); },
                                type: deposit_1.default({
                                    account: account,
                                    contract: contract,
                                    maxToDepositFunc: function () { return w.state.userBalanceEos; },
                                }),
                            },
                            {
                                id: "generate",
                                name: function () { return globals_1.t(templateObject_3 || (templateObject_3 = __makeTemplateObject(["Generate"], ["Generate"]))); },
                                type: generate_1.default({
                                    account: account,
                                    contract: contract,
                                    maxToGenerateFunc: function () { return w.state.maxEosdt; },
                                }),
                            },
                            {
                                id: "payback",
                                name: function () { return globals_1.t(templateObject_4 || (templateObject_4 = __makeTemplateObject(["Payback"], ["Payback"]))); },
                                type: payback_1.default({
                                    account: account,
                                    contract: contract,
                                    getNUTAmount: getNUTAmount,
                                    getUserBalanceEosdt: function () { return w.state.userBalanceEosdt || 0; },
                                    getUserBalanceNut: function () { return w.state.userBalanceNut || 0; },
                                    availableToPayback: function () { return w.state.eosdt; },
                                }),
                            },
                            {
                                id: "withdraw",
                                name: function () { return globals_1.t(templateObject_5 || (templateObject_5 = __makeTemplateObject(["Withdraw"], ["Withdraw"]))); },
                                type: withdraw_1.default({
                                    account: account,
                                    contract: contract,
                                    maxToWithdrawFunc: function () {
                                        return w.state.maxEos;
                                    },
                                }),
                            },
                        ],
                    });
                    w.update({
                        createPosition: createPosition,
                        parameters: parameters,
                        account: account,
                        positions: positions,
                        contract: contract,
                        tabs: tabs,
                        params: params,
                        rates: rates,
                        settings: settings,
                        balance: balance,
                        userBalanceEos: userBalanceEos,
                        userBalanceNut: userBalanceNut,
                        userBalanceEosdt: userBalanceEosdt,
                        getNUTAmount: getNUTAmount,
                        userBalances: userBalances,
                        currencyRates: currencyRates,
                    });
                    events.on("position:created", function () { return __awaiter(_this, void 0, void 0, function () {
                        var positions, rates, params, userBalanceArray, userBalanceEos, nutBalance, userBalanceNut, eosdtBalance, userBalanceEosdt;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4, contract.getAllUserPositions(name)];
                                case 1:
                                    positions = _a.sent();
                                    return [4, contract.getRates()];
                                case 2:
                                    rates = _a.sent();
                                    return [4, contract.getParameters()];
                                case 3:
                                    params = _a.sent();
                                    return [4, client.rpc.get_currency_balance("eosio.token", "" + account.name, "EOS")];
                                case 4:
                                    userBalanceArray = _a.sent();
                                    userBalanceEos = userBalanceArray
                                        ? parseFloat(userBalanceArray[0])
                                        : 0;
                                    return [4, client.rpc.get_currency_balance("eosdtnutoken", "" + account.name, "NUT")];
                                case 5:
                                    nutBalance = _a.sent();
                                    userBalanceNut = nutBalance.length ? parseFloat(nutBalance[0]) : 0;
                                    return [4, client.rpc.get_currency_balance("eosdtsttoken", "" + account.name, "EOSDT")];
                                case 6:
                                    eosdtBalance = _a.sent();
                                    userBalanceEosdt = eosdtBalance.length
                                        ? parseFloat(eosdtBalance[0])
                                        : 0;
                                    w.update({
                                        positions: positions,
                                        rates: rates,
                                        userBalanceEos: userBalanceEos,
                                        userBalanceNut: userBalanceNut,
                                        userBalanceEosdt: userBalanceEosdt,
                                        params: params,
                                    });
                                    return [2];
                            }
                        });
                    }); });
                    events.on("transaction", function () { return __awaiter(_this, void 0, void 0, function () {
                        var positions, rates, params, userBalanceArray, userBalanceEos, nutBalance, userBalanceNut, eosdtBalance, userBalanceEosdt;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4, contract.getAllUserPositions(name)];
                                case 1:
                                    positions = _a.sent();
                                    return [4, contract.getRates()];
                                case 2:
                                    rates = _a.sent();
                                    return [4, contract.getParameters()];
                                case 3:
                                    params = _a.sent();
                                    return [4, client.rpc.get_currency_balance("eosio.token", "" + account.name, "EOS")];
                                case 4:
                                    userBalanceArray = _a.sent();
                                    userBalanceEos = userBalanceArray
                                        ? parseFloat(userBalanceArray[0])
                                        : 0;
                                    return [4, client.rpc.get_currency_balance("eosdtnutoken", "" + account.name, "NUT")];
                                case 5:
                                    nutBalance = _a.sent();
                                    userBalanceNut = nutBalance.length ? parseFloat(nutBalance[0]) : 0;
                                    return [4, client.rpc.get_currency_balance("eosdtsttoken", "" + account.name, "EOSDT")];
                                case 6:
                                    eosdtBalance = _a.sent();
                                    userBalanceEosdt = eosdtBalance.length
                                        ? parseFloat(eosdtBalance[0])
                                        : 0;
                                    w.update({
                                        positions: positions,
                                        rates: rates,
                                        userBalanceEos: userBalanceEos,
                                        userBalanceNut: userBalanceNut,
                                        userBalanceEosdt: userBalanceEosdt,
                                        params: params,
                                    });
                                    return [2];
                            }
                        });
                    }); });
                    return [2];
            }
        });
    }); },
    onUpdate: function (w) { return __awaiter(_this, void 0, void 0, function () {
        var state, params, rates, settings, balance, positions, rate, stability_rate, eos_staked, _a, outstanding, collateral, k, eos, eosdt, usd, minLtv, ltv, minRate, maxEos, maxEosdt;
        return __generator(this, function (_b) {
            state = w.state;
            params = state.params, rates = state.rates, settings = state.settings, balance = state.balance, positions = state.positions;
            rate = rates.find(function (rate) { return rate.rate.indexOf("USD") >= 0; });
            if (!rate) {
                return [2];
            }
            stability_rate = params.stability_rate, eos_staked = params.eos_staked;
            if (!positions[0]) {
                return [2];
            }
            _a = positions[0], outstanding = _a.outstanding, collateral = _a.collateral;
            k = balance
                ? parseFloat(balance[0] + parseFloat(eos_staked)) / parseFloat(params.total_collateral)
                : 0;
            eos = parseFloat(collateral) * k;
            eosdt = parseFloat(outstanding) * parseFloat(stability_rate);
            usd = eos * parseFloat(rate.rate);
            minLtv = parseFloat(settings.critical_ltv);
            ltv = eosdt !== 0 ? usd / eosdt : 0;
            minRate = minLtv * eosdt / eos;
            maxEos = (usd - eosdt * minLtv) / parseFloat(rate.rate);
            maxEosdt = (usd - minLtv * eosdt) / minLtv;
            if (ltv !== w.state.ltv ||
                minRate !== w.state.minRate ||
                maxEos !== w.state.maxEos ||
                maxEosdt !== w.state.maxEosdt ||
                eosdt !== w.state.eosdt ||
                eos !== w.state.eos ||
                minLtv !== w.state.minLtv) {
                w.update({ ltv: ltv, minRate: minRate, maxEos: maxEos, maxEosdt: maxEosdt, eosdt: eosdt, eos: eos, minLtv: minLtv });
            }
            return [2];
        });
    }); },
    render: function (state, r) {
        var params = state.params, account = state.account, positions = state.positions, contract = state.contract, rates = state.rates, balance = state.balance, eos = state.eos, eosdt = state.eosdt, createPosition = state.createPosition, tabs = state.tabs;
        if (!account || !account.name) {
            return globals_1.t(templateObject_9 || (templateObject_9 = __makeTemplateObject(["\n      <div class=\"equil-position-manage__header\">\n        <a\n          class=\"equil-position-manage__logo\"\n          href=\"https://eosdt.com/\"\n          target=\"_blank\"\n        >\n          <img src=\"public/img/logo.svg\" />\n        </a>\n        <a\n          class=\"equil-position-manage__telegram\"\n          href=\"https://t.me/equilibrium_eosdt_official\"\n          target=\"_blank\"\n        >Join Telegram</a>\n      </div>\n      <div class=\"equil-position-manage__wrapper equil-position-manage__wrapper--loading\">\n        <div class=\"equil-position-actions\">\n          <h2 class=\"equil-position-manage__title\">\n            ", "\n          </h2>\n          <h2 class=\"equil-position-manage__parametersTitle\">Waiting for account...</h2>\n        </div>\n      </div>\n      <div class=\"equil-position-manage__balanceAndPrice\">\n        <div class=\"equil-position-manage__wrapper\">\n          <h2 class=\"equil-position-manage__title\">\n            ", "\n          </h2>\n          <div class=\"equil-user-balances\">\n            <div class=\"equil-user-balances__item\">\n              <img class=\"equil-user-balances__img\" src=\"public/img/EOS.svg\" alt=\"EOS\" />\n              <div class=\"equil-user-balances__values\">\n                <div>\n                  <span>EOS</span>\n                  <span>0.00</span>\n                </div>\n                <div class=\"equil-user-balances__USDvalue\">\n                  <span>USD</span>\n                  <span>$0.00</span>\n                </div>\n              </div>\n            </div>\n\n            <div class=\"equil-user-balances__item\">\n              <img class=\"equil-user-balances__img\" src=\"public/img/EOSDT.svg\" alt=\"EOSDT\" />\n              <div class=\"equil-user-balances__values\">\n                <div>\n                  <span>EOSDT</span>\n                  <span>0.00</span>\n                </div>\n                <div class=\"equil-user-balances__USDvalue\">\n                  <span>USD</span>\n                  <span>0.00</span>\n                </div>\n              </div>\n            </div>\n\n            <div class=\"equil-user-balances__item\">\n              <img class=\"equil-user-balances__img\" src=\"public/img/NUT.svg\" alt=\"NUT\" />\n              <div class=\"equil-user-balances__values\">\n                <div>\n                  <span>NUT</span>\n                  <span>0.00</span>\n                </div>\n                <div class=\"equil-user-balances__USDvalue\">\n                  <span>USD</span>\n                  <span>$0.00</span>\n                </div>\n              </div>\n            </div>\n          </div>\n        </div>\n        <div class=\"equil-position-manage__wrapper\">\n          <h2 class=\"equil-position-manage__title\">\n            ", "\n          </h2>\n          <div class=\"rates-5 equil-rates\">\n            <div class=\"equil-rates__item\">\n              <img class=\"equil-rates__img\" src=\"public/img/EOS.svg\" alt=\"EOS\" />\n              <div class=\"equil-rates__values\">\n                  <span>EOS</span>\n                  <span>$0</span>\n              </div>\n            </div>\n            <div class=\"equil-rates__item\">\n              <img class=\"equil-rates__img\" src=\"public/img/NUT.svg\" alt=\"NUT\" />\n              <div class=\"equil-rates__values\">\n                  <span>NUT</span>\n                  <span>$0</span>\n              </div>\n            </div>\n          </div>\n        </div>\n      </div>\n      "], ["\n      <div class=\"equil-position-manage__header\">\n        <a\n          class=\"equil-position-manage__logo\"\n          href=\"https://eosdt.com/\"\n          target=\"_blank\"\n        >\n          <img src=\"public/img/logo.svg\" />\n        </a>\n        <a\n          class=\"equil-position-manage__telegram\"\n          href=\"https://t.me/equilibrium_eosdt_official\"\n          target=\"_blank\"\n        >Join Telegram</a>\n      </div>\n      <div class=\"equil-position-manage__wrapper equil-position-manage__wrapper--loading\">\n        <div class=\"equil-position-actions\">\n          <h2 class=\"equil-position-manage__title\">\n            ", "\n          </h2>\n          <h2 class=\"equil-position-manage__parametersTitle\">Waiting for account...</h2>\n        </div>\n      </div>\n      <div class=\"equil-position-manage__balanceAndPrice\">\n        <div class=\"equil-position-manage__wrapper\">\n          <h2 class=\"equil-position-manage__title\">\n            ", "\n          </h2>\n          <div class=\"equil-user-balances\">\n            <div class=\"equil-user-balances__item\">\n              <img class=\"equil-user-balances__img\" src=\"public/img/EOS.svg\" alt=\"EOS\" />\n              <div class=\"equil-user-balances__values\">\n                <div>\n                  <span>EOS</span>\n                  <span>0.00</span>\n                </div>\n                <div class=\"equil-user-balances__USDvalue\">\n                  <span>USD</span>\n                  <span>$0.00</span>\n                </div>\n              </div>\n            </div>\n\n            <div class=\"equil-user-balances__item\">\n              <img class=\"equil-user-balances__img\" src=\"public/img/EOSDT.svg\" alt=\"EOSDT\" />\n              <div class=\"equil-user-balances__values\">\n                <div>\n                  <span>EOSDT</span>\n                  <span>0.00</span>\n                </div>\n                <div class=\"equil-user-balances__USDvalue\">\n                  <span>USD</span>\n                  <span>0.00</span>\n                </div>\n              </div>\n            </div>\n\n            <div class=\"equil-user-balances__item\">\n              <img class=\"equil-user-balances__img\" src=\"public/img/NUT.svg\" alt=\"NUT\" />\n              <div class=\"equil-user-balances__values\">\n                <div>\n                  <span>NUT</span>\n                  <span>0.00</span>\n                </div>\n                <div class=\"equil-user-balances__USDvalue\">\n                  <span>USD</span>\n                  <span>$0.00</span>\n                </div>\n              </div>\n            </div>\n          </div>\n        </div>\n        <div class=\"equil-position-manage__wrapper\">\n          <h2 class=\"equil-position-manage__title\">\n            ", "\n          </h2>\n          <div class=\"rates-5 equil-rates\">\n            <div class=\"equil-rates__item\">\n              <img class=\"equil-rates__img\" src=\"public/img/EOS.svg\" alt=\"EOS\" />\n              <div class=\"equil-rates__values\">\n                  <span>EOS</span>\n                  <span>$0</span>\n              </div>\n            </div>\n            <div class=\"equil-rates__item\">\n              <img class=\"equil-rates__img\" src=\"public/img/NUT.svg\" alt=\"NUT\" />\n              <div class=\"equil-rates__values\">\n                  <span>NUT</span>\n                  <span>$0</span>\n              </div>\n            </div>\n          </div>\n        </div>\n      </div>\n      "])), globals_1.t(templateObject_6 || (templateObject_6 = __makeTemplateObject(["Create position"], ["Create position"]))), globals_1.t(templateObject_7 || (templateObject_7 = __makeTemplateObject(["Balance"], ["Balance"]))), globals_1.t(templateObject_8 || (templateObject_8 = __makeTemplateObject(["Price"], ["Price"]))));
        }
        if (!contract) {
            return globals_1.t(templateObject_10 || (templateObject_10 = __makeTemplateObject(["<h2 class=\"equil-position-manage__parametersTitle\">Waiting for contract...</h2>"], ["<h2 class=\"equil-position-manage__parametersTitle\">Waiting for contract...</h2>"])));
        }
        if (!params) {
            return globals_1.t(templateObject_11 || (templateObject_11 = __makeTemplateObject(["<h2 class=\"equil-position-manage__parametersTitle\">Waiting for params...</h2>"], ["<h2 class=\"equil-position-manage__parametersTitle\">Waiting for params...</h2>"])));
        }
        if (!rates) {
            return globals_1.t(templateObject_12 || (templateObject_12 = __makeTemplateObject(["<h2 class=\"equil-position-manage__parametersTitle\">Waiting for rates...</h2>"], ["<h2 class=\"equil-position-manage__parametersTitle\">Waiting for rates...</h2>"])));
        }
        if (!balance || !balance[0]) {
            return globals_1.t(templateObject_13 || (templateObject_13 = __makeTemplateObject(["Waiting for contract balance..."], ["Waiting for contract balance..."])));
        }
        if (!Array.isArray(positions) || positions.length < 1) {
            if (createPosition) {
                return r(templateObject_19 || (templateObject_19 = __makeTemplateObject(["\n          <div class=\"equil-position-manage__header\">\n            <a\n              class=\"equil-position-manage__logo\"\n              href=\"https://eosdt.com/\"\n              target=\"_blank\"\n            >\n              <img src=\"public/img/logo.svg\" />\n            </a>\n            <a\n              class=\"equil-position-manage__telegram\"\n              href=\"https://t.me/equilibrium_eosdt_official\"\n              target=\"_blank\"\n            >Join Telegram</a>\n          </div>\n          <div class=\"equil-position-manage__wrapper\">\n            <div class=\"equil-position-actions\">\n              <h2 class=\"equil-position-manage__title\">\n                ", "\n              </h2>\n              ", "\n            </div>\n            <div class=\"equil-position-parameters equil-position-parameters--empty\">\n              <h2 class=\"equil-position-manage__parametersTitle\">", "</h2>\n                <span class=\"equil-position-parameters__title\">", "</span>\n            </div>\n          </div>\n          <div class=\"equil-position-manage__balanceAndPrice\">\n            <div class=\"equil-position-manage__wrapper\">\n              <h2 class=\"equil-position-manage__title\">\n                ", "\n              </h2>\n              ", "\n            </div>\n            <div class=\"equil-position-manage__wrapper\">\n              <h2 class=\"equil-position-manage__title\">\n                ", "\n              </h2>\n              ", "\n            </div>\n          </div>\n      "], ["\n          <div class=\"equil-position-manage__header\">\n            <a\n              class=\"equil-position-manage__logo\"\n              href=\"https://eosdt.com/\"\n              target=\"_blank\"\n            >\n              <img src=\"public/img/logo.svg\" />\n            </a>\n            <a\n              class=\"equil-position-manage__telegram\"\n              href=\"https://t.me/equilibrium_eosdt_official\"\n              target=\"_blank\"\n            >Join Telegram</a>\n          </div>\n          <div class=\"equil-position-manage__wrapper\">\n            <div class=\"equil-position-actions\">\n              <h2 class=\"equil-position-manage__title\">\n                ", "\n              </h2>\n              ", "\n            </div>\n            <div class=\"equil-position-parameters equil-position-parameters--empty\">\n              <h2 class=\"equil-position-manage__parametersTitle\">", "</h2>\n                <span class=\"equil-position-parameters__title\">", "</span>\n            </div>\n          </div>\n          <div class=\"equil-position-manage__balanceAndPrice\">\n            <div class=\"equil-position-manage__wrapper\">\n              <h2 class=\"equil-position-manage__title\">\n                ", "\n              </h2>\n              ", "\n            </div>\n            <div class=\"equil-position-manage__wrapper\">\n              <h2 class=\"equil-position-manage__title\">\n                ", "\n              </h2>\n              ", "\n            </div>\n          </div>\n      "])), globals_1.t(templateObject_14 || (templateObject_14 = __makeTemplateObject(["Create position"], ["Create position"]))), createPosition, globals_1.t(templateObject_15 || (templateObject_15 = __makeTemplateObject(["You don't have any positions yet"], ["You don't have any positions yet"]))), globals_1.t(templateObject_16 || (templateObject_16 = __makeTemplateObject(["Deposit collateral and generate <br/>EOSDT to get started"], ["Deposit collateral and generate <br/>EOSDT to get started"]))), globals_1.t(templateObject_17 || (templateObject_17 = __makeTemplateObject(["Balance"], ["Balance"]))), state.userBalances, globals_1.t(templateObject_18 || (templateObject_18 = __makeTemplateObject(["Price"], ["Price"]))), state.currencyRates);
            }
            else {
                return globals_1.t(templateObject_20 || (templateObject_20 = __makeTemplateObject(["Loading..."], ["Loading..."])));
            }
        }
        var rate = rates.find(function (rate) { return rate.rate.indexOf("USD") >= 0; });
        if (!rate) {
            throw new Error(globals_1.t(templateObject_21 || (templateObject_21 = __makeTemplateObject(["No USD rate"], ["No USD rate"]))));
        }
        if (tabs) {
            return r(templateObject_27 || (templateObject_27 = __makeTemplateObject(["\n      <div class=\"equil-position-manage__header\">\n        <a\n          class=\"equil-position-manage__logo\"\n          href=\"https://eosdt.com/\"\n          target=\"_blank\"\n        >\n          <img src=\"public/img/logo.svg\" />\n        </a>\n        <a\n          class=\"equil-position-manage__telegram\"\n          href=\"https://t.me/equilibrium_eosdt_official\"\n          target=\"_blank\"\n        >Join Telegram</a>\n      </div>\n      <div class=\"equil-position-manage__wrapper\">\n        <div class=\"equil-position-actions\">\n          <h2 class=\"equil-position-manage__title\">\n            ", "\n          </h2>\n          <div class=\"equil-position-actions__labels\">\n            <div class=\"equil-position-actions__label\">\n              <span>", "</span>\n              <span class=\"equil-position-actions__value\">", "</span>\n            </div>\n            <div class=\"equil-position-actions__label\">\n              <span>", "</span>\n              <span class=\"equil-position-actions__value\">", "</span>\n            </div>\n          </div>\n          ", "\n        </div>\n        ", "\n      </div>\n      <div class=\"equil-position-manage__balanceAndPrice\">\n        <div class=\"equil-position-manage__wrapper\">\n          <h2 class=\"equil-position-manage__title\">\n            ", "\n          </h2>\n          ", "\n        </div>\n        <div class=\"equil-position-manage__wrapper\">\n          <h2 class=\"equil-position-manage__title\">\n            ", "\n          </h2>\n          ", "\n        </div>\n"], ["\n      <div class=\"equil-position-manage__header\">\n        <a\n          class=\"equil-position-manage__logo\"\n          href=\"https://eosdt.com/\"\n          target=\"_blank\"\n        >\n          <img src=\"public/img/logo.svg\" />\n        </a>\n        <a\n          class=\"equil-position-manage__telegram\"\n          href=\"https://t.me/equilibrium_eosdt_official\"\n          target=\"_blank\"\n        >Join Telegram</a>\n      </div>\n      <div class=\"equil-position-manage__wrapper\">\n        <div class=\"equil-position-actions\">\n          <h2 class=\"equil-position-manage__title\">\n            ",
                "\n          </h2>\n          <div class=\"equil-position-actions__labels\">\n            <div class=\"equil-position-actions__label\">\n              <span>", "</span>\n              <span class=\"equil-position-actions__value\">",
                "</span>\n            </div>\n            <div class=\"equil-position-actions__label\">\n              <span>", "</span>\n              <span class=\"equil-position-actions__value\">",
                "</span>\n            </div>\n          </div>\n          ", "\n        </div>\n        ", "\n      </div>\n      <div class=\"equil-position-manage__balanceAndPrice\">\n        <div class=\"equil-position-manage__wrapper\">\n          <h2 class=\"equil-position-manage__title\">\n            ", "\n          </h2>\n          ", "\n        </div>\n        <div class=\"equil-position-manage__wrapper\">\n          <h2 class=\"equil-position-manage__title\">\n            ", "\n          </h2>\n          ", "\n        </div>\n"])), globals_1.t(templateObject_22 || (templateObject_22 = __makeTemplateObject(["Manage position of <i class=\"equil-position-manage__username\">", "</i>"], ["Manage position of <i class=\"equil-position-manage__username\">",
                "</i>"])), account.name), globals_1.t(templateObject_23 || (templateObject_23 = __makeTemplateObject(["EOS<br/>collateralized"], ["EOS<br/>collateralized"]))), eos.toFixed(4), globals_1.t(templateObject_24 || (templateObject_24 = __makeTemplateObject(["EOSDT<br/>generated"], ["EOSDT<br/>generated"]))), eosdt.toFixed(2), tabs, state.parameters, globals_1.t(templateObject_25 || (templateObject_25 = __makeTemplateObject(["Balance"], ["Balance"]))), state.userBalances, globals_1.t(templateObject_26 || (templateObject_26 = __makeTemplateObject(["Price"], ["Price"]))), state.currencyRates);
        }
        else {
            return globals_1.t(templateObject_28 || (templateObject_28 = __makeTemplateObject(["Loading..."], ["Loading..."])));
        }
    },
};
exports.default = ManagePosition;
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5, templateObject_6, templateObject_7, templateObject_8, templateObject_9, templateObject_10, templateObject_11, templateObject_12, templateObject_13, templateObject_14, templateObject_15, templateObject_16, templateObject_17, templateObject_18, templateObject_19, templateObject_20, templateObject_21, templateObject_22, templateObject_23, templateObject_24, templateObject_25, templateObject_26, templateObject_27, templateObject_28;
//# sourceMappingURL=index.js.map