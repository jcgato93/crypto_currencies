import * as Joi from 'joi';
import Validation from '../validation';

/**
 * @export
 * @class CurrencyValidation
 * @extends Validation
 */
class CurrencyValidation extends Validation {

    /**
     * Creates an instance of CurrencyValidation.
     * @memberof CurrencyValidation
     */
    constructor() {
        super();
    }  

    /**
     * @param {{ currenciesId: string[] }} body
     * @returns {Joi.ValidationResult<CurrencyUserList[]>}
     * @memberof CurrencyValidation
     */
    findCurrenciesDetail(
        currenciesId: string[]        
    ): Joi.ValidationResult {
        const schema: Joi.Schema = Joi.array().min(1).unique()        

        return schema.validate(currenciesId);        
    }

    
}

export default new CurrencyValidation();