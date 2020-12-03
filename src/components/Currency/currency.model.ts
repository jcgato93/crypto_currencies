export enum PreferedCurrencyEnum {
    DOLLAR='usd',
    EURO='eur',
    ARGENTINE_PESO='ars'
}



/**
 * @swagger
 * components:
 *  schemas:
 *    CurrencySchema:
 *      properties:
 *        id:
 *          type: string
 *        name:
 *          type: string
 *        symbol:
 *          type: string
 *        last_updated:
 *          type: date
 *        image:
 *          type: string
 *        current_price:
 *          type: integer
 *    Currency:
 *      type: array
 *      items:
 *        $ref: '#/components/schemas/CurrencySchema'
 */