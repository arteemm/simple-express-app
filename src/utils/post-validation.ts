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

const message = {
    errorsMessages: [
      {
        message: '',
        field: '',
      }
    ]
  }


const isProps = (requestObject: RequestBody) => {
    const {title, author, availableResolutions } = requestObject;
    if (!title  || typeof title !== 'string') {
        const res = {status: false, objError: { errorsMessages: [{message: 'title is not defined or it is\' not sting', field: 'title is wrong'}] }};
        return res;
    }

    if (!author || typeof author !== 'string') {
        const res = {status: false, objError: { errorsMessages: [{message: 'author is not defined or it is\' not sting', field: 'author is wrong'}] }};
        return res; 
    }

    if ((!availableResolutions?.length || !Array.isArray(availableResolutions)) && availableResolutions !== null) {
        const res = {status: false, objError: { errorsMessages: [{message: 'availableResolutions is not defined or it is\' not array', field: 'availableResolutions is wrong'}] }};
        return res; 
    }

    return {status: true, objError: {}};;
};

export const postValidation = (requestObject: RequestBody) => {
    const checkProps = isProps(requestObject);
    if (!checkProps.status) {
        return checkProps;
    }

    if (!checkMaxLength(requestObject.title, 40)) {
        const res = {status: false, objError: { errorsMessages: [{message: 'max length is 40 letters', field: 'title is wrong'}] }};
        return res; 
    }

    if (!checkMaxLength(requestObject.author, 20)) {
        const res = {status: false, objError: { errorsMessages: [{message: 'max length is 20 letters', field: 'author is wrong'}] }};
        return res; 
    }

    if (!checkAvailableResolutions(requestObject.availableResolutions)) {
        const res = {status: false, objError: { errorsMessages: [{message: 'wrong video quality', field: 'availableResolutions is wrong'}] }};
        return res; 
    }

    return {status: true, objError: {}};
};