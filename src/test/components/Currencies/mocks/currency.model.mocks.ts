import { CurrencyResponse } from "../../../../modules/Currency/response/currency.response";
import { CurrencyUserListResponse } from "../../../../modules/Currency/response/currencyUserList.response";

export const currenciesResponse: CurrencyResponse[] = [
    {
        id: "bitcoin",
        name: "Bitcoin",
        symbol: "btc",
        last_updated: new Date("2020-12-02T23:35:31.333Z"),
        image: "https://assets.coingecko.com/coins/images/1/large/bitcoin.png?1547033579",
        current_price: 1562781
    },
    {
        id: "ethereum",
        name: "Ethereum",
        symbol: "eth",
        last_updated: new Date("2020-12-02T23:37:33.219Z"),
        image: "https://assets.coingecko.com/coins/images/279/large/ethereum.png?1595348880",
        current_price: 48785
    }
]

export const currencyResponse: CurrencyResponse = {
    id: "bitcoin",
    name: "Bitcoin",
    symbol: "btc",
    last_updated: new Date("2020-12-02T23:35:31.333Z"),
    image: "https://assets.coingecko.com/coins/images/1/large/bitcoin.png?1547033579",
    current_price: 1562781
}

export const currenciesUserListResponse: CurrencyUserListResponse[] = [
    {
        id: "litecoin",
        symbol: "ltc",
        name: "Litecoin",
        image: "https://assets.coingecko.com/coins/images/2/large/litecoin.png?1547033580",
        last_updated: new Date("2020-12-02T06:44:48.619Z"),
        current_usd_price: 86.49,
        current_eur_price: 71.63,
        current_ars_price: 7042.25
      },
      {
        id: "bitcoin",
        symbol: "btc",
        name: "Bitcoin",
        image: "https://assets.coingecko.com/coins/images/1/large/bitcoin.png?1547033579",
        last_updated: new Date("2020-12-02T06:44:48.619Z"),
        current_usd_price: 86.49,
        current_eur_price: 71.63,
        current_ars_price: 7042.25
      }
]

export const currencyIds = [
    "bitcoin",
    "ethereum",
    "ripple",
    "tether",
    "litecoin"
]