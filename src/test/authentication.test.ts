import * as chai from 'chai';
import * as request from 'supertest';
import * as  app from '../app';
import { user } from './mocks/user';
chai.should();

/**
 * Authentication tests
 */
describe('Authentication', () => {
    it('sign up', (done) => {
        request(app)
            .post('/auth/signup')
            .send(user)
            .expect('Content-type', /json/)
            .expect((res) => {
                res.body.status.should.equal(200);
                res.body.logged.should.equal(true);
                res.body.message.should.be.a('string');                
            })
            .end(done)
    });
    it('sign up user with existing email', (done) => {
        request(app)
            .post('/auth/signup')
            .send(user)
            .expect('Content-type', /json/)
            .expect((res) => {
                res.body.status.should.equal(400);
            })
            .end(done);
    });
    it('login to app', (done) => {
        request(app)
            .post('/auth/login')
            .send(user)
            .expect('Content-type', /json/)
            .expect((res) => {
                res.body.status.should.equal(200);
                res.body.logged.should.equal(true);
                res.body.message.should.be.a('string');                
            })
            .end(done);
    });
});
