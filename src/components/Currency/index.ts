import { HttpError } from '../../config/error';
import { NextFunction, Request, Response } from 'express';
import CurrencyService from './currency.service';
import { PreferedCurrencyEnum } from './currency.model';
import { IUserModel } from '../User/user.model';
import { CurrencyResponse } from './response/currency.response';

/**
 * @export
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 * @returns {Promise < void >}
 */
export async function findAll(req: Request, res: Response, next: NextFunction): Promise < void > {
    try {
        const page =  req.params.page || 1;
        const per_page = req.params.per_page || 25;
        const user: IUserModel = req.user as IUserModel;
        const currencies: CurrencyResponse[] = await CurrencyService.findAll(
            user.prefered_currency as PreferedCurrencyEnum,
            page as number,
            per_page as number
        );

        res.status(200).json(currencies);
    } catch (error) {
        next(new HttpError(error.message.status, error.message));
    }
}