import { postValidation } from './post-validation';
import { RequestPutBody } from '../types';

const checkAge = (param: number | null, max: number, min: number) => {
    if (param === null) {
        return true;
    }

    if (+param > max || +param < min) {
        return false;
    }

    return true;
};

export const putValidation = (requestObject: RequestPutBody) => {
    const checkProps = postValidation(requestObject);
    if (!checkProps.status) {
        return checkProps;
    }

    if (!checkAge(requestObject.minAgeRestriction, 18, 1)) {
        const res = {status: false, objError: { errorsMessages: [{message: 'minAgeRestriction must < 18 and > 1', field: 'minAgeRestriction'}] }};
        return res; 
    }

    return {status: true, objError: {}};
};