import * as Joi from 'joi';
import UserModel, { IUserModel } from './user.model';
import UserValidation from './user.validation';
import { IUserService } from './user.interface';
import { Types } from 'mongoose';
import userModel from './user.model';
import CurrencyService  from '../Currency/currency.service';

/**
 * @export
 * @implements {IUserModelService}
 */
const UserService: IUserService = {
    
    /**
     * @param {string} id
     * @returns {Promise < IUserModel >}
     * @memberof UserService
     */
    async findOne(id: string): Promise < IUserModel > {
        try {     
            
            const validate: Joi.ValidationResult = UserValidation.getUser({
                id
            });

            if (validate.error) {
                throw new Error(validate.error.message);
            }
            
            return await UserModel.findOne({
                _id: Types.ObjectId(id)
            });
        } catch (error) {
            throw new Error(error.message);
        }
    },

    async addCurrency(userId:string, currencyId: string): Promise<boolean> {
        try {


            // check if currencyId exist
            const currency = await CurrencyService.findOne(currencyId)
            if(currency === null) {
               return false;
            }

            await userModel.updateOne({
                _id: Types.ObjectId(userId)
            }, 
            {$addToSet: {currencies: currencyId}
            });
                        
            return true;
            
        } catch (error) {
            throw new Error(error.message);
        }
    },

    /**
     * @param {IUserModel} user
     * @returns {Promise < IUserModel >}
     * @memberof UserService
     */
    async insert(body: IUserModel): Promise < IUserModel > {
        try {
            const validate: Joi.ValidationResult = UserValidation.createUser(body);

            if (validate.error) {
                throw new Error(validate.error.message);
            }
            
            const user: IUserModel = await UserModel.create(body);

            return user;
        } catch (error) {
            throw new Error(error.message);
        }
    },

    /**
     * @param {string} id
     * @returns {Promise < IUserModel >}
     * @memberof UserService
     */
    async remove(id: string): Promise < IUserModel > {
        try {     
            
            const validate: Joi.ValidationResult = UserValidation.removeUser({
                id
            });

            if (validate.error) {
                throw new Error(validate.error.message);
            }
            
            const user: IUserModel = await UserModel.findOneAndDelete({
                _id: Types.ObjectId(id)
            });

            return user;
        } catch (error) {
            throw new Error(error.message);
        }
    }
};

export default UserService;
