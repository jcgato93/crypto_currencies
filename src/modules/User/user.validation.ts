import * as Joi from 'joi';
import { PreferedCurrencyEnum } from '../Currency/currency.model';
import Validation from '../validation';
import { IUserModel } from './user.model';

/**
 * @export
 * @class UserValidation
 * @extends Validation
 */
class UserValidation extends Validation {

    /**
     * Creates an instance of UserValidation.
     * @memberof UserValidation
     */
    constructor() {
        super();
    }

    /**
     * @param {IUserModel} params
     * @returns {Joi.ValidationResult<IUserModel >}
     * @memberof UserValidation
     */
    createUser(
        params: IUserModel
    ): Joi.ValidationResult {
        const schema: Joi.Schema = Joi.object().keys({
            password: Joi.string().alphanum().min(8).required(),
            name: Joi.string().required(),
            lastname: Joi.string().required(),
            prefered_currency: Joi.string().valid(PreferedCurrencyEnum.ARGENTINE_PESO, PreferedCurrencyEnum.DOLLAR, PreferedCurrencyEnum.EURO).required(),
            username: Joi.string().required(),
        });

        return schema.validate(params);
    }

    /**
     * @param {{ id: string }} body
     * @returns {Joi.ValidationResult<{ id: string }>}
     * @memberof UserValidation
     */
    getUser(
        body: {
            id: string
        }
    ): Joi.ValidationResult {
        const schema: Joi.Schema = Joi.object().keys({
            id: this.customJoi.objectId().required()
        });

        return schema.validate(body);
    }

    /**
     * @param {{ id: string }} body
     * @returns {Joi.ValidationResult<{ id: string }>}
     * @memberof UserValidation
     */
    removeUser(
        body: {
            id: string
        }
    ): Joi.ValidationResult {
        const schema: Joi.Schema = Joi.object().keys({
            id: this.customJoi.objectId().required()
        });

        return schema.validate(body);
    }
}

export default new UserValidation();