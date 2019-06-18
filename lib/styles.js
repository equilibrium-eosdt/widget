"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var globals_1 = require("./globals");
var containerStyle = function (id) { return "\n#" + id + " {\n  display: flex;\n  flex-flow: column nowrap;\n}\n"; };
var styles = "\n  .equil-position-manage {\n    display: flex;\n  }\n\n  .equil-position-parameters {\n    display: flex;\n    align-items: flex-start;\n    justify-content: space-between;\n    flex-direction: column;\n    padding: 20px;\n    padding-bottom: 15px;\n    background: #ecf6ff;\n    flex: 0 0 320px;\n  }\n\n  .equil-position-parameters--empty {\n    justify-content: flex-start;\n  }\n\n  .equil-position-actions {\n    flex: 1 0 auto;\n    margin-right: 40px;\n  }\n\n  .equil-position-actions__labels {\n    display: flex;\n    align-items: center;\n    justify-content: space-between;\n    max-width: 320px;\n    width: 100%;\n    margin-bottom: 18px;\n  }\n\n  .equil-position-actions__label {\n    height: 50px;\n    flex: 0 0 48%;\n    max-width: 48%;\n    font-size: 12px;\n    line-height: 15px;\n    color: #002446;\n    background: #ecf6ff;\n    border-radius: 4px;\n\n    display: flex;\n    align-items: center;\n    justify-content: space-between;\n    padding: 10px;\n  }\n\n  .equil-position-parameters__item {\n    display: flex;\n    justify-content: space-between;\n    align-items: center;\n    border-bottom: 1px solid #0024461a;\n    min-height: 29px;\n    width: 100%;\n  }\n\n  .equil-position-parameters__item:last-of-type {\n    border-bottom: 1px solid transparent;\n  }\n\n  .equil-position-parameters__title {\n    font-size: 12px;\n  }\n\n  .equil-position-parameters__value,\n  .equil-position-actions__value {\n    font-family: \"Geometria-Bold\", serif;\n    font-size: 12px;\n  }\n\n  .equil-position-manage__title {\n    font-family: \"Geometria-Heavy\", serif;\n    color: #333;\n    font-size: 20px;\n    line-height: 25px;\n    margin-top: 0;\n    margin-bottom: 20px;\n  }\n\n  .equil-position-manage__username {\n  }\n\n  .equil-position-manage__tab-container {\n    display: flex;\n    flex-flow: column nowrap;\n  }\n\n  .equil-position-manage__tabs {\n    display: flex;\n    flex-flow: row nowrap;\n    list-style: none;\n    padding-left: 0px;\n    font-size: 16px;\n    margin-top: 0;\n  }\n\n  .equil-position-manage__tab {\n    border-bottom: 2px #fff solid;\n    cursor: pointer;\n    margin-right: 15px;\n    font-family: \"Geometria-Bold\", serif;\n    color: #002446;\n    opacity: 0.5;\n  }\n\n  .equil-position-manage__tab--active {\n    border-bottom: 2px #0024461a solid;\n    opacity: 1;\n  }\n\n  .equil-position-manage__error {\n    color: red;\n    position: absolute;\n    bottom: -40px;\n    font-size: 12px;\n  }\n\n  .equil-position-manage__pending {\n    position: absolute;\n    bottom: -40px;\n  }\n\n  .equil-scatter-auth {\n    display: flex;\n  }\n\n  .scatter-auth-button {\n    height: 30px;\n    min-width: 50px;\n    border: 0;\n    font-size: 16px;\n    color: #333;\n    background: #ccc;\n  }\n\n  .equil-position-manage__form {\n    display: flex;\n    position: relative;\n    flex-direction: column;\n  }\n\n  .equil-position-manage__input-wrapper {\n    display: flex;\n    flex-direction: column;\n    align-items: flex-start;\n    justify-content: space-between;\n    min-height: 61px;\n    margin-bottom: 25px;\n  }\n\n  .equil-position-manage__input-wrapper:last-of-type {\n    margin-bottom: 15px;\n  }\n\n  .equil-position-manage__input-label {\n    font-family: \"Geometria-Bold\", serif;\n    font-size: 12px;\n    line-height: 15px;\n    color: #002446;\n  }\n\n  .equil-position-manage__form--tab .equil-position-manage__input-wrapper {\n    min-height: 40px;\n  }\n\n  .equil-position-manage__input {\n    border: 1px solid #0024461a;\n    height: 40px;\n    max-width: 320px;\n    padding-left: 12px;\n    width: 100%;\n    outline: none;\n    font-family: \"Geometria-Bold\", serif;\n    font-size: 14px;\n    line-height: 18px;\n    color: #002446;\n  }\n\n  .equil-position-manage__input--error {\n    border-color: red;\n  }\n\n  .equil-position-manage__button {\n    max-width: 320px;\n    width: 100%;\n    height: 40px;\n\n    border-radius: 4px;\n    border: none;\n\n    color: #fff;\n    cursor: pointer;\n    font-size: 14px;\n    line-height: 18px;\n\n    background: #1792ff;\n  }\n";
exports.setStyles = function () {
    var element = window.document.createElement("style");
    element.appendChild(window.document.createTextNode(styles));
    window.document.body.appendChild(element);
};
exports.setContainerStyle = function (el) {
    var id = el.id;
    if (!id) {
        el.id = id = "widget-" + globals_1.autoIncrement();
    }
    var element = window.document.createElement("style");
    element.appendChild(window.document.createTextNode(containerStyle(id)));
    window.document.body.appendChild(element);
};
//# sourceMappingURL=styles.js.map