import { IUserModel } from './user.model';

/**
 * @export
 * @interface IUserService
 */
export interface IUserService {
    

    /**
     * @param {string} code
     * @returns {Promise<IUserModel>}
     * @memberof IUserService
     */
    findOne(code: string): Promise<IUserModel>;

    /**
     * @param {IUserModel} IUserModel
     * @returns {Promise<IUserModel>}
     * @memberof IUserService
     */
    insert(IUserModel: IUserModel): Promise<IUserModel>;

    
    /**
     * @param {string} currencyId
     * @returns {Promise<void>}
     * @memberof IUserService
     */
    addCurrency(userId:string, currencyId: string): Promise<boolean>;

    /**
     * @param {string} id
     * @returns {Promise<IUserModel>}
     * @memberof IUserService
     */
    remove(id: string): Promise<IUserModel>;
}
