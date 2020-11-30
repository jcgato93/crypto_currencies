import * as mongoose from 'mongoose';
import config from '../env/index';

interface IConnectOptions {
    autoReconnect: boolean;
    reconnectTries: number; // Never stop trying to reconnect
    reconnectInterval: number;
    loggerLevel ? : string;
    useNewUrlParser ? : boolean;
}

const connectOptions: IConnectOptions = {
    autoReconnect: true,
    reconnectTries: Number.MAX_VALUE,
    reconnectInterval: 1000, // every second
    useNewUrlParser: true,
};

const MONGO_URI = `${config.database.MONGO_DB_CONNECTION_TYPE}://${config.database.MONGO_DB_USER}:${config.database.MONGO_DB_PASS}@${config.database.MONGO_DB_HOST}/${config.database.MONGO_DB_NAME}?authSource=admin`;
console.log(MONGO_URI);
export const db: mongoose.Connection = mongoose.createConnection(MONGO_URI, connectOptions);

// handlers
/**
 * A really nice hack to change the colors (https://tforgione.fr/posts/ansi-escape-codes/)
 * Also, you can use chalk (https://www.npmjs.com/package/chalk)
 */
db.on('connecting', () => {
    console.log('\x1b[32m', 'MongoDB :: connecting');
});

db.on('error', (error) => {
    console.log('\x1b[31m', `MongoDB :: connection ${error}`);
    mongoose.disconnect();
});

db.on('connected', () => {
    console.log('\x1b[32m', 'MongoDB :: connected');
});

db.once('open', () => {
    console.log('\x1b[32m', 'MongoDB :: connection opened');
});

db.on('reconnected', () => {
    console.log('\x1b[33m"', 'MongoDB :: reconnected');
});

db.on('reconnectFailed', () => {
    console.log('\x1b[31m', 'MongoDB :: reconnectFailed');
});

db.on('disconnected', () => {
    console.log('\x1b[31m', 'MongoDB :: disconnected');
});

db.on('fullsetup', () => {
    console.log('\x1b[33m"', 'MongoDB :: reconnecting... %d');
});