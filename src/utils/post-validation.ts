import { RequestBody } from '../types';

const checkMaxLength = (par: string, maxLength: number) => {
    if (par.length > maxLength) {
        return false;
    }

    return true;
}

enum AvailableResolutions {
    P144 = 'P144',
    P240 = 'P240',
    P360 = 'P360',
    P480 = 'P480',
    P720 = 'P720',
    P1080 = 'P1080',
    P1440 = 'P1440',
    P2160 = 'P2160',
  };

const checkAvailableResolutions = (arr: string[]) => {
    if (arr === null) {
        return true;
    }

    const wrongArr = arr.filter(item => Object.keys(AvailableResolutions).indexOf(item) < 0);

    if (wrongArr.length > 0) return false;

    return true;
};

type Message = {
    status: boolean;
    objError: {
        errorsMessages: [{message: string, field: string}]
    }
};

export const postValidation = (requestObject: RequestBody) => {
    const message: Message = {
        status: true,
        objError: {
            errorsMessages: [
                {
                    message : "string",
                    field : "string"
                }
            ]
        }
    };

    message.objError.errorsMessages.splice(0);

    const {title, author, availableResolutions } = requestObject;

    if (!message.status && message.objError.errorsMessages.length) {
        return message;
    }

    if (!title  || typeof title !== 'string' || !checkMaxLength(requestObject.title, 40)) {
        message.status = false;
        message.objError.errorsMessages.push({message: 'title is not valid', field: 'title'}); 
    }

    if (!author || typeof author !== 'string' || !checkMaxLength(requestObject.author, 20)) {
        message.status = false;
        message.objError.errorsMessages.push({message: 'author is not valid', field: 'author'}); 
    }

    if (((!availableResolutions?.length || !Array.isArray(availableResolutions)) && availableResolutions !== null) || !checkAvailableResolutions(requestObject.availableResolutions)) {
        message.status = false;
        message.objError.errorsMessages.push({message: 'availableResolutions is not valid', field: 'availableResolutions'});
    }

    return message;
};