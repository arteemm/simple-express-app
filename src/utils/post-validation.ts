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

message.objError.errorsMessages.splice(0, 1);

const isProps = (requestObject: RequestBody) => {
    const {title, author, availableResolutions } = requestObject;
    if (!title  || typeof title !== 'string') {
        message.status = false;
        message.objError.errorsMessages.push({message: 'title is not defined or it is\' not sting', field: 'title'});
    }

    if (!author || typeof author !== 'string') {
        message.status = false;
        message.objError.errorsMessages.push({message: 'author is not defined or it is\' not sting', field: 'author'});
    }

    if ((!availableResolutions?.length || !Array.isArray(availableResolutions)) && availableResolutions !== null) {
        message.status = false;
        message.objError.errorsMessages.push({message: 'availableResolutions is not defined or it is\' not array', field: 'availableResolutions'});
    }
};

export const postValidation = (requestObject: RequestBody) => {
    message.objError.errorsMessages.splice(0);
     isProps(requestObject);

    if (!message.status) {
        return message;
    }

    if (!checkMaxLength(requestObject.title, 40)) {
        message.status = false;
        message.objError.errorsMessages.push({message: 'max length is 40 letters', field: 'title'}); 
    }

    if (!checkMaxLength(requestObject.author, 20)) {
        message.status = false;
        message.objError.errorsMessages.push({message: 'max length is 20 letters', field: 'author'}); 
    }

    if (!checkAvailableResolutions(requestObject.availableResolutions)) {
        message.status = false;
        message.objError.errorsMessages.push({message: 'wrong video quality', field: 'availableResolutions'});
    }

    return message;
};