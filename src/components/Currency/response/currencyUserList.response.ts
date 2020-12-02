import { Expose } from "class-transformer";

/**
 * @export
 * @interface CurrencyUserList
 * @extends {Document}
 */
export class CurrencyUserListResponse {
    @Expose()
    id: string;
    
    @Expose()
    symbol: string;
    
    @Expose()
    name: string;
    
    @Expose()
    image: string;
    
    @Expose()
    last_updated: Date;
    
    @Expose()
    current_usd_price: number;
    
    @Expose()
    current_eur_price: number;
    
    @Expose()
    current_ars_price: number;
}