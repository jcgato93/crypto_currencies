import UserService from './user.service';
import { HttpError } from '../../config/error';
import { IUserModel } from './user.model';
import { NextFunction, Request, Response } from 'express';
import CurrencyService from '../Currency/currency.service';
import { plainToClass } from 'class-transformer';
import { UserResponse } from './response/user.response';
import { AddCurrencyRequest } from './request/addCurrency.request';
import { CurrencyUserListResponse } from '../Currency/response/currencyUserList.response';

/**
 * @export
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 * @returns {Promise < void >}
 */
export async function findOne(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const currentUser: IUserModel = req.user as IUserModel;
        const user: IUserModel = await UserService.findOne(currentUser.id);

        const result = plainToClass(UserResponse, user, { excludeExtraneousValues: true })
        res.status(200).json(result);
    } catch (error) {
        next(new HttpError(error.message.status, error.message));
    }
}

/**
 * @export
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 * @returns {Promise < void >}
 */
export async function remove(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const currentUser: IUserModel = req.user as IUserModel;
        const user: IUserModel = await UserService.remove(currentUser.id);

        const result: UserResponse = plainToClass(UserResponse, user, { excludeExtraneousValues: true });
        res.status(200).json(result);
    } catch (error) {
        next(new HttpError(error.message.status, error.message));
    }
}


export async function findCurrenciesDetail(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const user: IUserModel = req.user as IUserModel;
        const limit: number = parseInt(req.query.limit as any) || 25;
        const order = req.query.order as any || 'market_cap_desc';

        // Get list of currencies from User
        const list = user.currencies;

        if (list === null || list.length === 0) {
            res.status(200).send([])
            return
        }
        const currencies: CurrencyUserListResponse[] = await CurrencyService.findCurrenciesDetail(list, limit, order);

        res.status(200).json(currencies);
    } catch (error) {
        next(new HttpError(error.message.status, error.message));
    }
}

export async function addCurrency(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const user: IUserModel = req.user as IUserModel;
        const { currency_id } = req.body as AddCurrencyRequest;

        const result = await UserService.addCurrency(user._id, currency_id);
        if (!result) {            
            res.status(404).json({status: 404, message: 'Currency id does not exist'})
        }

        res.status(200).send();
    } catch (error) {
        next(new HttpError(error.message.status, error.message));
    }
}

