import * as Joi from 'joi';
import CurrencyValidation from './currency.validation';
import { plainToClass } from 'class-transformer';
import { ICurrencyService } from './currency.interface';
import axios, { AxiosResponse } from "axios";
import { PreferedCurrencyEnum } from './currency.model';
import { CurrencyResponse } from './response/currency.response';
import { CurrencyUserListResponse } from './response/currencyUserList.response';


/**
 * @export
 * @implements {IUserModelService}
 */
const CurrencyService: ICurrencyService = {
    /**
     * @returns {Promise < Currency[] >}
     * @memberof CurrencyService
     */
    async findAll(preferedCurrency: PreferedCurrencyEnum, page = 1, per_page = 25): Promise<CurrencyResponse[]> {
        try {            
            const currencies: AxiosResponse = await axios.get(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=${preferedCurrency.toLowerCase()}&page=${page}&per_page=${per_page}`)
            const data = currencies.data as CurrencyResponse[];
            const result = plainToClass(CurrencyResponse, data, {excludeExtraneousValues: true}) as CurrencyResponse[];
            
            return result;
        } catch (error) {
            throw new Error(error.message);
        }
    },

    /**
     * @returns {Promise <Currency>}
     * @memberof CurrencyService
     */
    async findOne(currencyId: string): Promise<CurrencyResponse | null> {
        try {
            const currencies: AxiosResponse = await axios.get(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${currencyId}`);
            const data: CurrencyResponse[] = currencies.data;
            if(data.length > 0) {
                return data[0]
            }

            return null;
        } catch (error) {
            throw new Error(error.message);
        }
    },


    /**
     * @param {string[]} currenciesId
     * @returns {Promise < CurrencyUserList[] >}
     * @memberof UserService
     */
    async findCurrenciesDetail(currenciesId: string[], limit = 25, order: 'market_cap_desc' | 'market_cap_asc' = 'market_cap_desc'): Promise<CurrencyUserListResponse[]> {
        try {

            if(limit < 1 || limit > 25) { limit = 25}
            
            const validate: Joi.ValidationResult = CurrencyValidation.findCurrenciesDetail(currenciesId);

            if (validate.error) {
                throw new Error(validate.error.message);
            }

            const ids = currenciesId.join(',');

            // Get currency detail of every currency Id
            const currencies: AxiosResponse = await axios.get(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${ids}&order=${order}`);

            // Get prices vs usd, eur, ars
            const prices: AxiosResponse = await axios.get(`https://api.coingecko.com/api/v3/simple/price?ids=${ids}&vs_currencies=usd%2Cars%2Ceur`);

            
            const data: CurrencyUserListResponse[] = currencies.data;
            
            const response = data.map(currency => {
                const values = prices.data[currency.id];
                currency.current_usd_price = values.usd;
                currency.current_eur_price = values.eur;
                currency.current_ars_price = values.ars;
                
                return plainToClass(CurrencyUserListResponse, currency, { excludeExtraneousValues: true});
            });

            return response.slice(0, limit);

        } catch (error) {
            throw new Error(error.message);
        }
    },
};

export default CurrencyService;
