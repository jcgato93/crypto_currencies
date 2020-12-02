import * as http from 'http';
import * as passport from 'passport';
import * as passportLocal from 'passport-local';
import HttpError from '../error';
import UserModel, { IUserModel } from '../../components/User/user.model';
import { NextFunction, Request, Response } from 'express';
import { Strategy, ExtractJwt } from 'passport-jwt';
import * as jwt from 'jsonwebtoken';
import env from '../env';


type LocalStrategyType = typeof passportLocal.Strategy;

const LocalStrategy: LocalStrategyType = passportLocal.Strategy;

/**
 * @description
 * determines, which data of the user object should be stored in the session.
 * The result of the serializeUser method is attached to the session 
 * as req.session.passport.user = {}
 */
passport.serializeUser((user: {
    id: number
}, done: Function) => {
    done(undefined, user.id);
});

/**
 * @description
 * checks if user exists in database
 * if everything ok, proceed to route
 */
passport.deserializeUser(async (id: number, done: Function) => {
    try {
        const user: IUserModel = await UserModel.findById(id);        
        
        done(null, user);
    } catch (error) {
        done(error);
    }
});

/**
 * @description
 * configuring new local strategy
 * and use it in passport
 */
passport.use(new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
    session: false
}, async (username: string, password: string, done: Function): Promise<void> => {
    try {
        const user: IUserModel = await UserModel.findOne({
            username: username.toLowerCase()
        });

        if (!user) {
            return done(undefined, false, {
                message: `User name ${username} not found.`
            });
        }

        const isMatched: boolean = await user.comparePassword(password);

        if (isMatched) {
            return done(undefined, user);
        }

        return done(undefined, false, {
            message: 'Invalid user name or password.'
        });

    } catch (error) {
        done(error);
    }
}));


/**
 * @description
 * configuring new jwt strategy
 * and use it in passport
 */
const opts: any = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = env.auth_jwt_secret;
opts.algorithms = ['HS256'];
passport.use(
    new Strategy(
        {
            secretOrKey: opts.secretOrKey,
            jwtFromRequest: opts.jwtFromRequest,
            algorithms: opts.algorithms
        },
        async function (tokenPayload, done) {                     
            UserModel.findOne({_id: tokenPayload.sub})
                .then(data=>{
                if (data === null) { //User doesn't exist                    
                    return done(null, false);
                }
                /** User found, so we going to return using req.user on current request */                
                else  
                    return done(null, data);
                })
                .catch(err=>done(err, null))
        }
    )
);



/**
 * @description Login Required middleware.
 */
export function ensureAuthenticated(req: Request, res: Response, next: NextFunction): void {
    passport.authenticate('jwt', {session: false}, (err, user, info)=>{
                        
        // Invalid token
        if(info){ return next(new HttpError(401, http.STATUS_CODES[401])); }

        // some other error, like error connection to databse
        if (err) { return next(err); }

        // valid token but, no for the current user
        if (!user) { return next(new HttpError(403, http.STATUS_CODES[403])); }
        
        // put user information in the request        
        req.user = user;
        next();
    })(req, res, next);
}


