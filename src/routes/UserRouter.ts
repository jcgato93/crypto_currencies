import { response, Router } from 'express';
import { UserComponent } from '../components';

/**
 * @constant {express.Router}
 */
const router: Router = Router();




/**
 * GET method route 
 * @example http://localhost:PORT/v1/users
 * 
 * @swagger
 * /v1/users:
 *  get:
 *    description: Get current user information
 *    tags: ["users"]
 *    security:
 *      - bearerAuth: []
 *    responses:
 *      200:
 *        description: return current user
 *        content:
 *          application/json:
 *            schema:
 *              oneOf:
 *                - $ref: '#/components/schemas/UserSchema'
 *            example:
 *              name: test_name
 *              lastname: test_lastname
 *              prefered_currency: ars
 *              username: username.test 
 *              currencies: [bitcoin]
 */
router.get('/', UserComponent.findOne);

/**
 * POST method route 
 * @example http://localhost:PORT/v1/users/currencies
 * 
 * @swagger
 * /v1/users/currencies:
 *  post:
 *    description: Add a Currency Id to Current User
 *    tags: ["users"]
 *    security:
 *      - bearerAuth: []
 *    parameters:
 *      - name: currency_id
 *        description: A valid currency id
 *        in: body
 *        required: true
 *        type: string
 *    responses:
 *      200:
 *        description: OK
 *      400:
 *        description: Bad request. Currency id does not exist
 */
router.post('/currencies', UserComponent.addCurrency);

/**
 * GET method route 
 * @example http://localhost:PORT/v1/users/currencies
 * 
 * @swagger
 * /v1/users/currencies:
 *  get:
 *    description: get top of preferred  currencies
 *    tags: ["users"]
 *    security:
 *      - bearerAuth: []
 *    parameters:
 *      - name: limit
 *        description: valid values 1 ... 25, default 25
 *        in: query
 *        required: false
 *        type: integer
 *      - name: order
 *        description: valid values market_cap_desc, market_cap_asc. desc by default
 *        in: query
 *        required: false
 *        type: string
 *    responses:
 *      200:
 *        description: OK
 *        content:
 *          application/json:
 *            schema:
 *              oneOf:
 *                - $ref: '#/components/schemas/UserSchema'
 *            example:
 *              - id: litecoin
 *                symbol: ltc
 *                name: Litecoin
 *                image: https://assets.coingecko.com/coins/images/2/large/litecoin.png?1547033580
 *                last_updated: 2020-12-02T06:44:48.619Z
 *                current_usd_price: 86.49 
 *                current_eur_price: 71.63
 *                current_ars_price: 7042.25
 *              - id: bitcoin
 *                symbol: btc
 *                name: Bitcoin
 *                image: https://assets.coingecko.com/coins/images/1/large/bitcoin.png?1547033579
 *                last_updated: 2020-12-02T06:44:48.619Z
 *                current_usd_price: 86.49 
 *                current_eur_price: 71.63
 *                current_ars_price: 7042.25
 */
router.get('/currencies', UserComponent.findCurrenciesDetail);

/**
 * DELETE method route
 * @example  http://localhost:PORT/v1/users
 * 
 * @swagger
 * /v1/users:
 *  delete:
 *    description: Delete user currently logged (Something like delete my account)
 *    tags: ["users"]
 *    security:
 *      - bearerAuth: []
 *    parameters:
 *      - in: path
 *        name: id
 *        description: the unique userId
 *        required: true
 *        schema:
 *          type: string
 *    responses:
 *      200:
 *        description: return deleted user
 *        content:
 *          application/json:
 *            schema:
 *              oneOf:
 *                - $ref: '#/components/schemas/UserSchema'
 *            example:
 *              name: test_name
 *              lastname: test_lastname
 *              prefered_currency: ars
 *              username: username.test 
 *              currencies: [bitcoin]
 */
router.delete('/', UserComponent.remove);



/**
 * @export {express.Router}
 */
export default router;
