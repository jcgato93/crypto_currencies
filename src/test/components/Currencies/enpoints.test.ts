import * as chai from 'chai';
import { testServer } from "../../testServer";;
import userModel from '../../../modules/User/user.model';
import { signupRequest } from '../Auth/mocks/auth.model.mocks';
import { expect } from 'chai';
chai.should();




describe('routes - api - currencies', function () {

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


    describe('GET /v1/currencies', () => {
        it('should return status 200 and list of currencies', (done) => {
            testServer()
                .get('/v1/currencies')
                .set('Authorization', 'Bearer ' + token)
                .expect((res) => {
                    res.status.should.equal(200);
                }).end((err, res) => {
                    res.body.should.be.an('array')
                    done();
                });

        });

        it('should return status 401 Unauthorized', (done) => {
            testServer()
                .get('/v1/currencies')
                .expect((res) => {
                    res.status.should.equal(401);
                }).end((err, res) => {
                    expect(res.body).eql({
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



