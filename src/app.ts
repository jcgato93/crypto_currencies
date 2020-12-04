import * as express from 'express';
import 'reflect-metadata';
import env from './config/env';
import * as Middleware from './config/middleware/middleware'
import * as serverHandlers from './config/server/serverHandlers';
import * as Routes from './routes';


// Create a new express application instance
const app: express.Application = express();

/** 
 * @constructs express.Application Middleware
 */
Middleware.configure(app);

/**
 * @constructs express.Application Routes
 */
Routes.init(app);

/**
 * @constructs express.Application Error Handler
 */
Middleware.initErrorHandler(app);


const port: number | string = env.port || 3000;
app.listen(port, function () {
  console.log(`app listening on port ${port}`);

})
.on('error', (error: Error) => serverHandlers.onError(error, app.get('port')))



/**
 * @exports {express.Application}
 */
export default app;

