"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Signal = (function () {
    function Signal() {
        var _this = this;
        this.wait = function () {
            if (!_this.finished) {
                return _this.promise;
            }
            if (_this.error) {
                return Promise.reject(_this.error);
            }
            return Promise.resolve(_this.result);
        };
        this.emit = function (v) {
            if (!_this.finished) {
                _this.finished = true;
                _this.result = v;
                _this.resolve(v);
            }
        };
        this.cancel = function (e) {
            if (!_this.finished) {
                _this.finished = true;
                _this.error = e;
                _this.reject(e);
            }
        };
        this.finished = false;
        this.promise = new Promise(function (resolve, reject) {
            _this.resolve = resolve;
            _this.reject = reject;
        });
    }
    return Signal;
}());
exports.default = Signal;
//# sourceMappingURL=signal.js.map