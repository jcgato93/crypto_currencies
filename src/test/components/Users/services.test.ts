import { expect } from 'chai';
import UserModel from '../../../modules/User/user.model';
import UserService from '../../../modules/User/user.service';
import { addCurrencyRequest, userModel } from './mocks/users.model.mock';

describe('services - User ', () => {
    let userId: string;
    before('Delete mock user created in database', async () => {
        try {
            await UserModel.collection.drop();
        } catch (error) {
            console.log('Something went wrong after tests, seems your database doesnt cleaned');
        }
    });

    describe('when insert method is called', () => {
        it('should create a new user', (done) => {
            const user: any = userModel;
            UserService.insert(user)
            .then((userSaved) => {
                userId = userSaved.id;
                expect(userSaved).to.have.property('_id');
                done()
            }); 
        });
    
        it('should return and error for invalid parameters', (done) => {
            const user: any = userModel;
            user.password = '.1234/'
            user.prefed_currency = 'test'
            UserService.insert(user)
            .then().catch((res) => { 
                //'Error: "password" must only contain alpha-numeric characters';
                expect(res).exist
                done()
            });
            
        });
    })

    describe('when findOne method is called', () => {
        it('should return a user', (done) => {            
            UserService.findOne(userId)
            .then((user) => {                
                expect(user).to.have.property('name');
                expect(user).to.have.property('lastname');
                expect(user).to.have.property('username');
                expect(user).to.have.property('password');
                done()
            }); 
        });
    
        it('should return a null for invalid id', (done) => {
            UserService.findOne('507f1f77bcf86cd799439011')
            .then((user) => {                   
                expect(user).null
                done()
            }); 
        });
    });
    

    describe('when addCurrency method is called', () => {
        it('should return true', (done) => {            
            UserService.addCurrency(userId, addCurrencyRequest[0].currency_id)
            .then((result) => {                
                expect(result).to.be.true; 
                done()
            }); 
        });
    
        it('should return false for invalid currency', (done) => {
            UserService.addCurrency(userId, 'invalid_currency')
            .then((result) => {                
                expect(result).to.be.false;
                done()
            }); 
        });
    });


    describe('when remove method is called', () => {
        it('should return a IUserModel', (done) => {            
            UserService.remove(userId)
            .then((user) => {                
                expect(user).to.have.property('_id');
                expect(user).to.have.property('name');
                expect(user).to.have.property('lastname');
                expect(user).to.have.property('username');
                expect(user).to.have.property('password'); 
                done()
            }); 
        });
    
        it('should return false for invalid currency', (done) => {
            UserService.addCurrency(userId, 'invalid_currency')
            .then((result) => {                                
                expect(result).to.be.false;
                done()
            }); 
        });
    });


    after('Delete mock user created in database', async () => {
        try {
            await UserModel.collection.drop();
        } catch (error) {
            console.log('Something went wrong after tests, seems your database doesnt cleaned');
        }
    });
});