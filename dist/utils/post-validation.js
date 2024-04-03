"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postValidation = void 0;
const checkMaxLength = (par, maxLength) => {
    if (par.length > maxLength) {
        return false;
    }
    return true;
};
var AvailableResolutions;
(function (AvailableResolutions) {
    AvailableResolutions["P144"] = "P144";
    AvailableResolutions["P240"] = "P240";
    AvailableResolutions["P360"] = "P360";
    AvailableResolutions["P480"] = "P480";
    AvailableResolutions["P720"] = "P720";
    AvailableResolutions["P1080"] = "P1080";
    AvailableResolutions["P1440"] = "P1440";
    AvailableResolutions["P2160"] = "P2160";
})(AvailableResolutions || (AvailableResolutions = {}));
;
const checkAvailableResolutions = (arr) => {
    const wrongArr = arr.filter(item => Object.keys(AvailableResolutions).indexOf(item) < 0);
    if (wrongArr.length > 0)
        return false;
    return true;
};
const postValidation = (requestObject) => {
    if (!checkMaxLength(requestObject.title, 40)) {
        const res = { status: false, message: 'max length is 40 letters', field: 'title is wrong' };
        return res;
    }
    if (!checkMaxLength(requestObject.author, 20)) {
        const res = { status: false, message: 'max length is 20 letters', field: 'author is wrong' };
        return res;
    }
    if (!checkAvailableResolutions(requestObject.availableResolutions)) {
        const res = { status: false, message: 'wrong video quality', field: 'availableResolutions is wrong' };
        return res;
    }
    return { status: true, message: 'it\'s ok', field: '' };
};
exports.postValidation = postValidation;
