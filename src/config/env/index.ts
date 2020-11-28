import * as dotenv from 'dotenv';

dotenv.config();

// Environments
export enum EnvironmentEnum {
    DEVELOPMENT = 'development',
    PRODUCTION = 'production',
    TEST = 'test'
}

interface IConfig {
    port: string | number;
    database: {
        MONGO_DB_CONNECTION_TYPE: string;
        MONGO_DB_NAME: string;
        MONGO_DB_HOST: string;
        MONGO_DB_USER: string;
        MONGO_DB_PASS: string;
    };
    secret: string;
}

const NODE_ENV: EnvironmentEnum = process.env.NODE_ENV as EnvironmentEnum || EnvironmentEnum.DEVELOPMENT;


// Development Environment Configuration
const development: IConfig = {
    port: process.env.PORT || 3000,
    database: {
        MONGO_DB_CONNECTION_TYPE: process.env.MONGODB_URI || 'mongodb',
        MONGO_DB_NAME: process.env.MONGODB_DB_MAIN || 'users_db',
        MONGO_DB_HOST: process.env.MONGO_DB_HOST || 'localhost',
        MONGO_DB_USER: process.env.MONGO_DB_USER || 'user',
        MONGO_DB_PASS: process.env.MONGO_DB_PASS || 'pass',
    },
    secret: process.env.SECRET || '@QEGTUI'
};

// Production Environment Configuration
const production: IConfig = {
    port: process.env.PORT || 3000,
    database: {
        MONGO_DB_CONNECTION_TYPE: process.env.MONGODB_URI || 'mongodb',
        MONGO_DB_NAME: process.env.MONGODB_DB_MAIN || 'users_db',
        MONGO_DB_HOST: process.env.MONGO_DB_HOST || 'localhost',
        MONGO_DB_USER: process.env.MONGO_DB_USER || 'user',
        MONGO_DB_PASS: process.env.MONGO_DB_PASS || 'pass',
    },
    secret: process.env.SECRET || '@QEGTUI'
};

// Test Environment Configuration
const test: IConfig = {
    port: process.env.PORT || 3000,
    database: {
        MONGO_DB_CONNECTION_TYPE: process.env.MONGODB_URI || 'mongodb',
        MONGO_DB_NAME: process.env.MONGODB_DB_MAIN || 'users_db',
        MONGO_DB_HOST: process.env.MONGO_DB_HOST || 'localhost',
        MONGO_DB_USER: process.env.MONGO_DB_USER || 'user',
        MONGO_DB_PASS: process.env.MONGO_DB_PASS || 'pass',
    },
    secret: process.env.SECRET || '@QEGTUI'
};

const config: {
    [name: string]: IConfig
} = {
    test,
    development,
    production
};

export default config[NODE_ENV];