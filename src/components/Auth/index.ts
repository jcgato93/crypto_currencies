import * as passport from 'passport';
import AuthService from './auth.service';
import HttpError from '../../config/error';
import { IUserModel } from '../User/user.model';
import { NextFunction, Request, Response } from 'express';

import * as jwt from 'jsonwebtoken';
import env from '../../config/env';


/**
 * 
 * @param {Request} req 
 * @param {Response} res 
 * @param {NextFunction}next 
 * @param {IUserModel} user 
 * @param {string} resMessage 
 */
function passportRequestLogin(req: Request, res: Response, next: NextFunction, user: IUserModel, resMessage: string): void {
    return req.logIn(user, (err) => {
        if (err) return next(new HttpError(err));


        const payload = { 
            sub: user.id, 
            username: user.username,
            preferedCurrency: user.prefered_currency,
            iat: Date.now() + parseInt(env.auth_jwt_lifetime)
        }

        const token = jwt.sign(payload, env.auth_jwt_secret, {
            expiresIn: `${env.auth_jwt_lifetime}s`
        });

        res.status(200).json({            
            access_token: token,            
        });
    });
}

/**
 * @export
 * @param {Request} req 
 * @param {Response} res 
 * @param {NextFunction} next 
 * @returns {Promise < void >}
 */
export async function signup(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const user: IUserModel = await AuthService.createUser(req.body);

        passportRequestLogin(req, res, next, user, 'Sign in successfull');
    } catch (error) {
        if (error.code === 500) {
            return next(new HttpError(error.message.status, error.message));
        }
        res.json({
            status: 400,
            message: error.message
        });
    }
}

/**
 * @export
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 * @returns {Promise < void >}
 */
export async function login(req: Request, res: Response, next: NextFunction): Promise<void> {
    passport.authenticate('local', {session: false}, (err: Error, user: IUserModel) => {
        if (err) {
            return next(new HttpError(400, err.message));
        }

        if (!user) {
            return res.status(401).json({                
                logged: false,
                message: 'Invalid credentials!'
            });
        }
        passportRequestLogin(req, res, next, user, 'Sign in successfull');
    })(req, res, next);
}
/**
 * @export
 * @param {Request} req 
 * @param {Response} res 
 * @param {NextFunction} next
 * @returns {Promise < void >} 
 */
export async function logout(req: Request, res: Response, next: NextFunction): Promise<void> {

    if (!req.user) {
        res.status(401).json({            
            logged: false,
            message: 'You are not authorized to app. Can\'t logout'
        });
    }

    if (req.user) {
        req.logout();
        res.status(200).json({            
            logged: false,
            message: 'Successfuly logged out!'
        });
    }

}
