"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var util_1 = require("./util");
var data = {
    counter: 0,
};
exports.autoIncrement = function () { return ++data.counter; };
exports.t = util_1.createLocaleTemplateFunction({});
exports.setLocale = function (locale, extract) {
    var localeMap = Object.keys(locale).reduce(function (map, key) { return map.set(key, locale[key]); }, new Map());
    if (!extract) {
        exports.t = util_1.createLocaleTemplateFunction({ locale: localeMap });
    }
    else {
        exports.t = util_1.createLocaleTemplateFunction({ locale: localeMap, extract: extract });
    }
};
//# sourceMappingURL=globals.js.map