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
    const wrongArr = arr.filter(item => Object.keys(AvailableResolutions).indexOf(item) < 0);

    if (wrongArr.length > 0) return false;

    return true;
};

export const postValidation = (requestObject: RequestBody) => {
    if (!checkMaxLength(requestObject.title, 40)) {
        const res = {status: false, message: 'max length is 40 letters', field: 'title is wrong'};
        return res; 
    }

    if (!checkMaxLength(requestObject.author, 20)) {
        const res = {status: false, message: 'max length is 20 letters', field: 'author is wrong'};
        return res; 
    }

    if (!checkAvailableResolutions(requestObject.availableResolutions)) {
        const res = {status: false, message: 'wrong video quality', field: 'availableResolutions is wrong'};
        return res; 
    }

    return {status: true, message: 'it\'s ok', field: ''};
};