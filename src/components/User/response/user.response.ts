import { Expose } from "class-transformer";

export class UserResponse {
    @Expose()
    name: string;

    @Expose()
    lastname: string;

    @Expose()
    username: string;    

    @Expose()
    prefered_currency: string;

    @Expose()
    currencies: string[];
}