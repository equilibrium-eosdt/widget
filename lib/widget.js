"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var globals_1 = require("./globals");
var signal_1 = __importDefault(require("./signal"));
var Widget = (function () {
    function Widget(el, def, ctx) {
        var _this = this;
        this.id = globals_1.autoIncrement();
        this.ready = false;
        this.children = {};
        this.renderTemplate = function (parts) {
            var args = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                args[_i - 1] = arguments[_i];
            }
            return parts.reduce(function (prev, part, index) {
                var arg = args[index];
                if (!arg) {
                    return "" + prev + part;
                }
                if (typeof arg === "object") {
                    var id = arg.id, type = arg.type, element = arg.element, className = arg.className;
                    var el = element || "div";
                    var classes = id + "-" + _this.id;
                    if (className) {
                        classes += " " + arg.className;
                    }
                    if (!_this.children[id]) {
                        _this.children[id] = { def: type };
                    }
                    return "" + prev + part + "<" + el + " class=\"" + classes + "\"></" + el + ">";
                }
                return "" + prev + part + arg;
            }, "");
        };
        var state = def.state, onInit = def.onInit, onUpdate = def.onUpdate, render = def.render;
        this.ctx = ctx;
        this.element = el;
        this.state = state;
        this.lifecycle = { onInit: onInit, onUpdate: onUpdate, render: render };
        this.init();
    }
    Widget.prototype.readyCheck = function () {
        if (!this.ready) {
            throw new Error("Widget is not ready");
        }
    };
    Widget.prototype.updateChildren = function (onlyInit) {
        if (onlyInit === void 0) { onlyInit = false; }
        for (var _i = 0, _a = Object.keys(this.children); _i < _a.length; _i++) {
            var id = _a[_i];
            var _b = this.children[id], def = _b.def, widget = _b.widget;
            var className = id + "-" + this.id;
            var el = this.find("." + className);
            if (widget) {
                if (onlyInit) {
                    throw new Error("Widget should not be initialized");
                }
                if (el) {
                    widget.attach(el);
                }
            }
            else {
                if (el) {
                    var ctx = this.ctx;
                    this.children[id] = __assign({}, this.children[id], { widget: new Widget(el, def, ctx) });
                }
            }
        }
    };
    Widget.prototype.init = function () {
        var _this = this;
        var _a = this, element = _a.element, _b = _a.lifecycle, onInit = _b.onInit, render = _b.render, state = _a.state;
        this.sig = new signal_1.default();
        if (element) {
            element.innerHTML = render(state, this.renderTemplate);
            this.updateChildren();
        }
        else {
            throw new Error("No mounting node");
        }
        if (onInit) {
            onInit(this)
                .then(function () {
                _this.ready = true;
                _this.sig.emit();
            })
                .catch(function (err) {
                element.innerHTML = "<span class=\"equil-widget-error\">" + err.message + "</span>";
                console.info("Error mounting node:", err.stack);
                _this.sig.cancel(err);
            });
        }
        else {
            this.ready = true;
            this.sig.emit();
        }
    };
    Widget.prototype.attach = function (el) {
        this.readyCheck();
        this.element = el;
        this.update({});
    };
    Widget.prototype.find = function (cssSelector) {
        if (this.element) {
            if (!cssSelector) {
                return this.element;
            }
            return this.element.querySelector(cssSelector);
        }
        return null;
    };
    Widget.prototype.update = function (state) {
        var _this = this;
        if (state === void 0) { state = {}; }
        this.sig.wait()
            .then(function () {
            _this.sig = new signal_1.default();
            var _a = _this.lifecycle, render = _a.render, onUpdate = _a.onUpdate;
            var prevState = __assign({}, _this.state);
            _this.state = __assign({}, prevState, state);
            _this.element.innerHTML = render(_this.state, _this.renderTemplate);
            _this.updateChildren();
            if (onUpdate) {
                return onUpdate(_this, prevState);
            }
            return;
        })
            .then(function () {
            _this.sig.emit();
        })
            .catch(function (err) {
            _this.element.innerHTML = "<span class=\"widget-error\">" + err.message + "</span>";
            console.info("Error updating node:", err.stack);
            _this.sig.cancel(err);
        });
    };
    return Widget;
}());
exports.Widget = Widget;
//# sourceMappingURL=widget.js.map