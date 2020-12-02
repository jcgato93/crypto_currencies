import { Router } from 'express';
import { CurrencyComponent } from '../components';

/**
 * @constant {express.Router}
 */
const router: Router = Router();


router.get('/', CurrencyComponent.findAll);


/**
 * @export {express.Router}
 */
export default router;