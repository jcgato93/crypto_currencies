/* eslint-disable @typescript-eslint/no-unused-vars */
import { ICurrencyService } from "../../../../modules/Currency/currency.interface";
import { PreferedCurrencyEnum } from "../../../../modules/Currency/currency.model";
import { CurrencyResponse } from "../../../../modules/Currency/response/currency.response";
import { CurrencyUserListResponse } from "../../../../modules/Currency/response/currencyUserList.response";
import { currenciesResponse, currenciesUserListResponse, currencyResponse } from "./currency.model.mocks";

const CurrencyServiceMock: ICurrencyService = {
    /**
     * @returns {Promise < CurrencyResponse[] >}
     * @memberof CurrencyService
     */
    async findAll(preferedCurrency: PreferedCurrencyEnum, page = 1, per_page = 50): Promise<CurrencyResponse[]> {
      return currenciesResponse;
    },

    /**
     * @returns {Promise <Currency>}
     * @memberof CurrencyService
     */
    async findOne(currencyId: string): Promise<CurrencyResponse | null> {
        return currencyResponse;
    },


    /**
     * @param {string[]} currenciesId
     * @returns {Promise < CurrencyUserList[] >}
     * @memberof UserService
     */
    async findCurrenciesDetail(currenciesId: string[], limit = 25, order: 'market_cap_desc' | 'market_cap_asc' = 'market_cap_desc'): Promise<CurrencyUserListResponse[]> {
       return  currenciesUserListResponse;
    },
};

export default CurrencyServiceMock;