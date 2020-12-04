import { AddCurrencyRequest } from "../../../../modules/User/request/addCurrency.request";
import { UserResponse } from "../../../../modules/User/response/user.response";

export const userResponse: UserResponse = {
    name: "john",
    lastname: "doe",
    prefered_currency: "ars",
    username: "john_doe",
    currencies: []
}

export const addCurrencyRequest: AddCurrencyRequest[] = [
    { currency_id: 'bitcoin' },
    { currency_id: 'ethereum' },
    { currency_id: 'litecoin' },
    { currency_id: 'chainlink' }
]

export const userModel = {
    name: "john_test",
    lastname: "doe_test",
    username: "john_doe_test",
    password: "test123456",
    prefered_currency: "ars"
}