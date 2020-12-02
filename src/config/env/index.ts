import chalk = require('chalk');
import * as dotenv from 'dotenv';

// Environments
export enum EnvironmentEnum {
    DEVELOPMENT = 'development',
    PRODUCTION = 'production',
    TEST = 'test'
}


export const NODE_ENV: EnvironmentEnum = process.env.NODE_ENV?.toString().trim() as EnvironmentEnum || EnvironmentEnum.DEVELOPMENT;

if(NODE_ENV !== EnvironmentEnum.PRODUCTION) {
    dotenv.config({path: `${__dirname}/../../../.env.${NODE_ENV}`});
} else {
    dotenv.config();
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

    auth_admin_username: string;
    auth_admin_password: string;
    auth_admin_email: string;
    auth_jwt_secret: string;
    auth_jwt_lifetime: string;
}




// Development Environment Configuration
const development: IConfig = {
    port: process.env.PORT || 3000,
    database: {
        MONGO_DB_CONNECTION_TYPE: process.env.MONGO_DB_CONNECTION_TYPE || 'mongodb',
        MONGO_DB_NAME: process.env.MONGODB_DB_MAIN || 'users_db',
        MONGO_DB_HOST: process.env.MONGO_DB_HOST || 'localhost',
        MONGO_DB_USER: process.env.MONGO_DB_USER || 'user',
        MONGO_DB_PASS: process.env.MONGO_DB_PASS || 'pass',
    },
    secret: process.env.SECRET || '@QEGTUI',
    auth_admin_username: process.env.AUTH_ADMIN_USERNAME,
    auth_admin_password: process.env.AUTH_ADMIN_PASSWORD,
    auth_admin_email: process.env.AUTH_ADMIN_EMAIL,
    auth_jwt_secret: process.env.AUTH_JWT_SECRET,
    auth_jwt_lifetime: process.env.AUTH_JWT_LIFETIME
};

// Production Environment Configuration
const production: IConfig = {
    port: process.env.PORT || 3000,
    database: {
        MONGO_DB_CONNECTION_TYPE: process.env.MONGO_DB_CONNECTION_TYPE || 'mongodb',
        MONGO_DB_NAME: process.env.MONGODB_DB_MAIN || 'users_db',
        MONGO_DB_HOST: process.env.MONGO_DB_HOST || 'localhost',
        MONGO_DB_USER: process.env.MONGO_DB_USER || 'user',
        MONGO_DB_PASS: process.env.MONGO_DB_PASS || 'pass',
    },
    secret: process.env.SECRET || '@QEGTUI',
    auth_admin_username: process.env.AUTH_ADMIN_USERNAME,
    auth_admin_password: process.env.AUTH_ADMIN_PASSWORD,
    auth_admin_email: process.env.AUTH_ADMIN_EMAIL,
    auth_jwt_secret: process.env.AUTH_JWT_SECRET,
    auth_jwt_lifetime: process.env.AUTH_JWT_LIFETIME
};

// Test Environment Configuration
const test: IConfig = {
    port: process.env.PORT || 3000,
    database: {
        MONGO_DB_CONNECTION_TYPE: process.env.MONGO_DB_CONNECTION_TYPE || 'mongodbaaaa',
        MONGO_DB_NAME: process.env.MONGODB_DB_MAIN || 'users_db',
        MONGO_DB_HOST: process.env.MONGO_DB_HOST || 'localhost',
        MONGO_DB_USER: process.env.MONGO_DB_USER || 'user',
        MONGO_DB_PASS: process.env.MONGO_DB_PASS || 'pass',
    },
    secret: process.env.SECRET || '@QEGTUI',
    auth_admin_username: process.env.AUTH_ADMIN_USERNAME,
    auth_admin_password: process.env.AUTH_ADMIN_PASSWORD,
    auth_admin_email: process.env.AUTH_ADMIN_EMAIL,
    auth_jwt_secret: process.env.AUTH_JWT_SECRET,
    auth_jwt_lifetime: process.env.AUTH_JWT_LIFETIME
};

const config: {
    [name: string]: IConfig
} = {
    test,
    development,
    production
};

export default config[NODE_ENV];