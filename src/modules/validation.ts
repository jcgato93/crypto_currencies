import * as Joi from 'joi';
import { Types } from 'mongoose';

/**
 * @export
 * @class Validation
 */
abstract class Validation {
    // can`t assign to customJoi any type of Joi Schemas - because of custom field objectId. Need to discuss this
    customJoi: any;

    /**
     * @static
     * @type {string}
     * @memberof JoiSchema
     */
    readonly messageObjectId: string =
        'Argument passed in must be a single String of 12 bytes or a string of 24 hex characters';


    

    /**
     * Creates an instance of Schema.
     * @memberof JoiSchema
     */
    constructor() {
        this.customJoi = Joi.extend((joi) => {
            return {
                type: 'objectId',                                
                base: joi.string(),
                messages: {
                    'objectId.valid': '"{{#label}}" must be a valid mongo id'
                },
                coerce(value) {
                    return { value };
                },
                validate(value, helpers) {
                    if (!Types.ObjectId.isValid(value)) {
                        return helpers.error('objectId.valid');
                    }
                }
            };
        });
    }
}

export default Validation;