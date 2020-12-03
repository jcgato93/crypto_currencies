import * as supertest from 'supertest';
import * as app from '../app';

export function testServer(): supertest.SuperTest<supertest.Test> {    
    return supertest(app.default);
}