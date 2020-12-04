import { Router } from 'express';
import { CurrencyComponent } from '../modules';

/**
 * @constant {express.Router}
 */
const router: Router = Router();


/**
 * GET method route
 * @example  http://localhost:PORT/v1/currencies
 * 
 * @swagger
 * /v1/currencies:
 *  get:
 *    description: Get available currencies
 *    tags: ["currencies"]
 *    security:
 *      - bearerAuth: []
 *    parameters:
 *      - in: query
 *        name: page
 *        description: Page through results Default value 1
 *        required: false
 *        schema:
 *          type: integer
 *      - in: query
 *        name: per_page
 *        description: items per page, Default value 50.
 *                     valid values 1...250
 *        required: false
 *        schema:
 *          type: integer
 *    responses:
 *      200:
 *        description: return the list of currencies
 *        content:
 *          application/json:
 *            schema:
 *              oneOf:
 *                - $ref: '#/components/schemas/CurrencySchema'
 *            example:
 *              - id: bitcoin
 *                name: Bitcoin
 *                symbol: btc
 *                last_updated: 2020-12-02T23:35:31.333Z
 *                image: https://assets.coingecko.com/coins/images/1/large/bitcoin.png?1547033579
 *                current_price: 1562781
 *              - id: ethereum
 *                name: Ethereum
 *                symbol: eth
 *                last_updated: 2020-12-02T23:37:33.219Z
 *                image: https://assets.coingecko.com/coins/images/279/large/ethereum.png?1595348880
 *                current_price: 48785
 */
router.get('/', CurrencyComponent.findAll);


/**
 * @export {express.Router}
 */
export default router;