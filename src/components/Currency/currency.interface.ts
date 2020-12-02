import { PreferedCurrencyEnum } from './currency.model';
import { CurrencyResponse } from './response/currency.response';
import { CurrencyUserListResponse } from './response/currencyUserList.response';

/**
 * @export
 * @interface ICurrencyService
 */
export interface ICurrencyService {

    /**
     * @returns {Promise<Currency[]>}
     * @memberof ICurrencyService
     */
    findAll(preferedCurrency: PreferedCurrencyEnum, page: number, per_page: number): Promise<CurrencyResponse[]>;


    /**
     * @returns {Promise<Currency[]>}
     * @memberof ICurrencyService
     */
    findOne(currencyId: string): Promise<CurrencyResponse>;

    /**
     * @returns {Promise<CurrencyUserList[]>}
     * @memberof ICurrencyService
     */
    findCurrenciesDetail(currenciesId: string[], limit: number, order: 'market_cap_desc' | 'market_cap_asc'): Promise<CurrencyUserListResponse[]>;
}