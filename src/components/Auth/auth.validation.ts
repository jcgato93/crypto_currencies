import * as Joi from 'joi';
import Validation from '../validation';
import { IUserModel } from '../User/user.model';
import { PreferedCurrencyEnum } from '../Currency/currency.model';

/**
 * @export
 * @class AuthValidation
 * @extends Validation
 */
class AuthValidation extends Validation {

    /**
    * Creates an instance of AuthValidation.
    * @memberof AuthValidation
    */
    constructor() {
        super();
    }
    /**
     * @param {SignupRequest} params
     * @returns {Joi.ValidationResult<SignupRequest>}
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
}

export default new AuthValidation();
