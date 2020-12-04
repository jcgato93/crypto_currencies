import { Expose } from "class-transformer";

/**
 * @export
 * @interface CurrencyList
 * @extends {Document}
 */
export class CurrencyResponse {  
    @Expose()  
    id: string;

    @Expose()
    name: string;

    @Expose()
    symbol: string;

    @Expose()
    last_updated: Date;

    @Expose()
    image: string;

    @Expose()
    current_price: number;    
}