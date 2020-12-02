import { IUserModel } from '../User/user.model';
import { SignupRequest } from './request/signup.request';

/**
 * @export
 * @interaface IAuthService
 */
export interface IAuthService {
    /**
     * @param {IUserModel} IUserModel
     * @returns {Promise<IUserModel>}
     * @memberof AuthService
     */
    createUser(IUserModel: SignupRequest): Promise<IUserModel>;
}