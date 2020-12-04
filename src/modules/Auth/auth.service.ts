import * as Joi from 'joi';
import AuthValidation from './auth.validation';
import UserModel, { IUserModel } from '../User/user.model';
import { IAuthService } from './auth.interface';

/**
 * @export
 * @implements {IAuthService}
 */
const AuthService: IAuthService = {

    /**
     * @param {IUserModel} body
     * @returns {Promise <IUserModel>}
     * @memberof AuthService
     */
    async createUser(body: IUserModel): Promise < IUserModel > {
        try {
            const validate: Joi.ValidationResult = AuthValidation.createUser(body);

            if (validate.error) {
                throw new Error(validate.error.message);
            }

            const user: IUserModel = new UserModel({
                username: body.username,
                password: body.password,
                name: body.name,
                lastname: body.lastname,
                prefered_currency: body.prefered_currency
            });

            const query: IUserModel = await UserModel.findOne({
                username: body.username
            });

            if (query) {
                throw new Error('This username already exists');
            }

            const saved: IUserModel = await user.save();

            return saved;
        } catch (error) {
            throw new Error(error);
        }
    },
};

export default AuthService;
