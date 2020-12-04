import * as express from 'express';
import * as http from 'http';
import * as passportConfig from '../config/middleware/passport';
import * as swaggerUi from 'swagger-ui-express';
import * as chalk from 'chalk';
import { NODE_ENV, EnvironmentEnum } from '../config/env';
// eslint-disable-next-line @typescript-eslint/ban-types
let swaggerDoc: Object;

import AuthRouter from './AuthRouter';
import UserRouter from './UserRouter';
import CurrencyRouter from './CurrenciyRouter';

if (NODE_ENV === EnvironmentEnum.DEVELOPMENT) {
    try {
        swaggerDoc = require('../../swagger.json');
    } catch (error) {
        console.log('***************************************************');
        console.log(chalk.red('  Seems like you doesn\`t have swagger.json file'));
        console.log('  Please, run: ');
        console.log('  $ npm run docs:generate');
        console.log('***************************************************');
        process.exit(1);
    }
}



/**
 * @export
 * @param {express.Application} app
 */
export function init(app: express.Application): void {
    const router: express.Router = express.Router();

    /**
     * @description
     *  Forwards any requests to the /v1/users URI to our UserRouter
     *  Also, check if user authenticated
     * @constructs
     */
    app.use('/v1/users',
        passportConfig.ensureAuthenticated,
        UserRouter);

    /**
     * @description
     *  Forwards any requests to the /v1/currencies URI to our CurrencyRouter
     *  Also, check if user authenticated
     * @constructs
     */
    app.use('/v1/currencies',
    passportConfig.ensureAuthenticated,
    CurrencyRouter
    );

    /**
     * @description Forwards any requests to the /auth URI to our AuthRouter
     * @constructs
     */
    app.use('/auth', AuthRouter);

    /**
     * @description
     *  If swagger.json file exists in root folder, shows swagger api description
     *  else send commands, how to get swagger.json file
     * @constructs
     */
    if (NODE_ENV === EnvironmentEnum.DEVELOPMENT && swaggerDoc) {
        app.use('/docs', swaggerUi.serve);
        app.get('/docs', swaggerUi.setup(swaggerDoc));
    } else {
        app.get('/docs', (req, res) => {
            res.send('<p>Seems like you doesn\'t have <code>swagger.json</code> file.</p>' +
                '<p>For generate doc file use: <code>swagger-jsdoc -d swaggerDef.js -o swagger.json</code> in terminal</p>' +
                '<p>Then, restart your application</p>');
        });
    }

    /** 
     * @description No results returned mean the object is not found
     * @constructs
     */
    app.use((req, res) => {
        res.status(404).send(http.STATUS_CODES[404]);
    });

    /**
     * @constructs all routes
     */
    app.use(router);
}
