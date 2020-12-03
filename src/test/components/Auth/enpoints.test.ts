
import * as chai from 'chai';
import { testServer } from "../../testServer";;
import { signupRequest } from './mocks/auth.model.mocks';
import userModel from '../../../components/User/user.model';
chai.should();
const expect = chai.expect;



describe('routes - api - auth', function () {

    describe('POST /signup', () => {
        it('should return status 200 and access_token', (done) => {
            testServer()
                .post('/auth/signup')
                .send(signupRequest)
                .expect((res) => {
                    res.status.should.equal(200);
                }).end((err, res) => {
                    res.body.should.have.property('access_token')
                    done();
                });

        });

        it('should return status 400, username already exist', (done) => {
            testServer()
                .post('/auth/signup')
                .send(signupRequest)
                .expect((res) => {
                    res.status.should.equal(400);
                }).end((err, res) => {
                    expect(res.body).to.eql(
                        {
                            status: 400,                            
                            message: 'Error: This username already exists'
                        })
                    done();
                });

        });
    }),


    describe('POST /loging', () => {

        it('should return status 200 and access_token', (done) => {
            testServer()
                .post('/auth/login')
                .send(signupRequest)
                .expect((res) => {
                    res.status.should.equal(200);
                }).end((err, res) => {
                    res.body.should.have.property('access_token')
                    done();
                });

        });

        it('should return status 401, Invalid credentials', (done) => {
            testServer()
                .post('/auth/login')
                .send({ username: "2312154564adfad", message: ".../46a54df"})
                .expect((res) => {
                    res.status.should.equal(401);
                }).end((err, res) => {
                    expect(res.body).to.eql(
                        {
                            logged: false,
                            message: "Invalid credentials!"
                        })
                    done();
                });

        });
    });
})

after('Delete mock user created in database', async () => {
    try {
        await userModel.deleteOne({ username: signupRequest.username });
    } catch (error) {
        console.log('Something went wrong after tests, seems your database doesnt cleaned');
    }
});



