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

    const {minAgeRestriction, canBeDownloaded } = requestObject;

    if ((!minAgeRestriction  || typeof minAgeRestriction !== 'number') && minAgeRestriction !== null) {
        checkProps.status = false;
        checkProps.objError.errorsMessages.push({message: 'minAgeRestriction is not defined or it is\' not sting', field: 'minAgeRestriction'});
    }

    if (!canBeDownloaded || typeof canBeDownloaded !== 'boolean') {
        checkProps.status = false;
        checkProps.objError.errorsMessages.push({message: 'canBeDownloaded is not defined or it is\' not boolean', field: 'canBeDownloaded'});
    }

    if (!checkAge(requestObject.minAgeRestriction, 18, 1)) {
        checkProps.status = false;
        checkProps.objError.errorsMessages.push({message: 'minAgeRestriction must < 18 and > 1', field: 'minAgeRestriction'});
    }

    return checkProps;
};