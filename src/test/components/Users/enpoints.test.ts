import * as chai from 'chai';
import { testServer } from "../../testServer";;
import { expect } from 'chai';
import { signupRequest } from '../Auth/mocks/auth.model.mocks';
import { addCurrencyRequest, userResponse } from './mocks/users.model.mock';
import userModel from '../../../modules/User/user.model';
chai.should();


describe('routes - api - users', function () {

    let token: string;
    before('Get token', (done) => {
        testServer()
            .post('/auth/signup')
            .send(signupRequest)
            .end(function () {
                testServer()
                    .post('/auth/login')
                    .send(signupRequest)
                    .end(function (err, res) {
                        token = res.body.access_token;
                        done();
                    });
            });
    });


    describe('GET /v1/users', () => {
        it('should return status 200 and current user information', (done) => {
            testServer()
                .get('/v1/users')
                .set('Authorization', 'Bearer ' + token)
                .expect((res) => {
                    res.status.should.equal(200);
                }).end((err, res) => {
                    expect(res.body).to.eql(userResponse)
                    done();
                });

        });

        it('should return status 401 Unauthorized', (done) => {
            testServer()
                .get('/v1/users')
                .expect((res) => {
                    res.status.should.equal(401);
                }).end((err, res) => {
                    expect(res.body).to.eql({
                        status: 401,
                        name: "Error",
                        message: "Unauthorized"
                    })
                    done();
                });

        });
    });


    describe('POST /v1/users/currencies', () => {

        it('should return status 200 - add currency', (done) => {
            addCurrencyRequest.forEach((currency) => {
                testServer()
                    .post('/v1/users/currencies')
                    .set('Authorization', 'Bearer ' + token)
                    .send(currency)
                    .expect((res) => {
                        res.status.should.equal(200);
                    });
            });
            done();
        });

        it('should return status 404 - add invalid currency', (done) => {
            testServer()
                .post('/v1/users/currencies')
                .set('Authorization', 'Bearer ' + token)
                .send({ currency_id: 'invalid_id' })
                .end((err, res) => {
                    res.status.should.equal(404);
                    expect(res.body).to.eql({
                        status: 404,                        
                        message: "Currency id does not exist"
                    });
                    done();
                });
        });

        it('should return status 401 Unauthorized', (done) => {
            testServer()
                .post('/v1/users/currencies')
                .send(addCurrencyRequest[0])
                .expect((res) => {
                    res.status.should.equal(401);
                }).end((err, res) => {
                    expect(res.body).to.eql({
                        status: 401,
                        name: "Error",
                        message: "Unauthorized"
                    });
                    done();
                });

        });
    });


    describe('GET /v1/users/currencies', () => {

        it('should return status 200 and the top of currencies', (done) => {
            testServer()
                .get('/v1/users/currencies')
                .set('Authorization', 'Bearer ' + token)
                .expect((res) => {
                    res.status.should.equal(200);                    
                }).end((err, res) => {                    
                    res.body.should.be.a('array')
                    done();
                });
        });

        it('should return status 401 Unauthorized', (done) => {
            testServer()
                .get('/v1/users/currencies')
                .expect((res) => {
                    res.status.should.equal(401);
                }).end((err, res) => {
                    expect(res.body).to.eql({
                        status: 401,
                        name: "Error",
                        message: "Unauthorized"
                    })
                    done();
                });

        });
    });

    describe('DELETE /v1/users', () => {

        it('should return status 200 - delete my account', (done) => {
            testServer()
                .get('/v1/users')
                .set('Authorization', 'Bearer ' + token)
                .expect((res) => {
                    res.status.should.equal(200);                    
                }).end((err, res) => {                    
                    res.body.username.should.equal(signupRequest.username)
                    done();
                });
        });

        it('should return status 401 Unauthorized', (done) => {
            testServer()
                .get('/v1/users')
                .expect((res) => {
                    res.status.should.equal(401);
                }).end((err, res) => {                    
                    expect(res.body).to.eql({
                        status: 401,
                        name: "Error",
                        message: "Unauthorized"
                    })
                    done();
                });

        });
    });

    after('Delete mock user created in database', async () => {
        try {
            await userModel.deleteOne({ username: signupRequest.username });
        } catch (error) {
            console.log('Something went wrong after tests, seems your database doesnt cleaned');
        }
    });
});
