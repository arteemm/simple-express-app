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
    if (arr === null) {
        return true;
    }
    const wrongArr = arr.filter(item => Object.keys(AvailableResolutions).indexOf(item) < 0);
    if (wrongArr.length > 0)
        return false;
    return true;
};
const message = {
    errorsMessages: [
        {
            message: '',
            field: '',
        }
    ]
};
const isProps = (requestObject) => {
    const { title, author, availableResolutions } = requestObject;
    if (!title || typeof title !== 'string') {
        const res = { status: false, objError: { errorsMessages: [{ message: 'title is not defined or it is\' not sting', field: 'title is wrong' }] } };
        return res;
    }
    if (!author || typeof author !== 'string') {
        const res = { status: false, objError: { errorsMessages: [{ message: 'author is not defined or it is\' not sting', field: 'author is wrong' }] } };
        return res;
    }
    if ((!(availableResolutions === null || availableResolutions === void 0 ? void 0 : availableResolutions.length) || !Array.isArray(availableResolutions)) && availableResolutions !== null) {
        const res = { status: false, objError: { errorsMessages: [{ message: 'availableResolutions is not defined or it is\' not array', field: 'availableResolutions is wrong' }] } };
        return res;
    }
    return { status: true, objError: {} };
    ;
};
const postValidation = (requestObject) => {
    const checkProps = isProps(requestObject);
    if (!checkProps.status) {
        return checkProps;
    }
    if (!checkMaxLength(requestObject.title, 40)) {
        const res = { status: false, objError: { errorsMessages: [{ message: 'max length is 40 letters', field: 'title is wrong' }] } };
        return res;
    }
    if (!checkMaxLength(requestObject.author, 20)) {
        const res = { status: false, objError: { errorsMessages: [{ message: 'max length is 20 letters', field: 'author is wrong' }] } };
        return res;
    }
    if (!checkAvailableResolutions(requestObject.availableResolutions)) {
        const res = { status: false, objError: { errorsMessages: [{ message: 'wrong video quality', field: 'availableResolutions is wrong' }] } };
        return res;
    }
    return { status: true, objError: {} };
};
exports.postValidation = postValidation;
