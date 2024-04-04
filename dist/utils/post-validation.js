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
const postValidation = (requestObject) => {
    const message = {
        status: true,
        objError: {
            errorsMessages: [
                {
                    message: "string",
                    field: "string"
                }
            ]
        }
    };
    message.objError.errorsMessages.splice(0);
    const { title, author, availableResolutions } = requestObject;
    if (!message.status && message.objError.errorsMessages.length) {
        return message;
    }
    if (!title || typeof title !== 'string' || !checkMaxLength(requestObject.title, 40)) {
        message.status = false;
        message.objError.errorsMessages.push({ message: 'title is not valid', field: 'title' });
    }
    if (!author || typeof author !== 'string' || !checkMaxLength(requestObject.author, 20)) {
        message.status = false;
        message.objError.errorsMessages.push({ message: 'author is not valid', field: 'author' });
    }
    if (((!(availableResolutions === null || availableResolutions === void 0 ? void 0 : availableResolutions.length) || !Array.isArray(availableResolutions)) && availableResolutions !== null) || !checkAvailableResolutions(requestObject.availableResolutions)) {
        message.status = false;
        message.objError.errorsMessages.push({ message: 'availableResolutions is not valid', field: 'availableResolutions' });
    }
    return message;
};
exports.postValidation = postValidation;
