import { AuthComponent } from '../components';
import { Router } from 'express';

/**
 * @constant {express.Router}
 */
const router: Router = Router();

/**
 * POST method route
 * @example http://localhost:PORT/signup
 * @swagger
 * /auth/signup/:
 *  post:
 *    description: sign up user to application
 *    tags: ["auth"]
 *    requestBody:
 *      description: sign up body
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/UserSchema'
 *          example:
 *            name: test_name
 *            lastname: test_lastname
 *            prefered_currency: ars
 *            username: username.test 
 *            password: test123456
 *              
 *    responses:
 *      200:
 *        description: user successfuly signed in
 *        content:
 *          appication/json:
 *            example:
 *              access_token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1ZmM3MjE2YzA0M2M1YjQ0ODg4YjA0MmYiLCJ1c2VybmFtZSI6InRlc3QiLCJwcmVmZXJlZEN1cnJlbmN5IjoiYXJzIiwiaWF0IjoxNjA2ODg1NzQwLCJleHAiOjE2MDY4ODY2NDB9.1Nhc-UH2ZU5-kbgeEn8fvr2F0uA25-_j3km_opkN-cE
 *      400:
 *        description: sign in failed
 *        content:
 *          application/json:
 *            example:
 *              status: 400
 *              message: This username already exists
 */
router.post('/signup', AuthComponent.signup);

/**
 * POST method route
 * @example http://localhost:PORT/login
 * 
 * @swagger
 * /auth/login/:
 *  post:
 *    description: Login user to application
 *    tags: ["auth"]
 *    requestBody:
 *      description: login body
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/UserSchema'
 *          example:
 *            username: username.test
 *            password: test123456
 *    responses:
 *      200:
 *        description: user successfuly logged
 *        content:
 *          appication/json:
 *            example:
 *              access_token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1ZmM2OTE1ZWUxMmVjYjFjNjg3N2I5YTAiLCJ1c2VybmFtZSI6InRlc3QiLCJwcmVmZXJlZEN1cnJlbmN5IjoiQVJTIiwiaWF0IjoxNjA2ODc4NTM1LCJleHAiOjE2MDY4Nzk0MzV9.ccdCzUFMR1VKpK0l8A5YiqjEX88bkGbKdFbTJsvjeak

 *      401:
 *        description: Not logged, invalid credentials
 *        content:
 *          application/json:
 *            example:
 *              logged: false
 *              message: Invalid credentials
 */
router.post('/login', AuthComponent.login);


/**
 * @export {express.Router}
 */
export default router;
