import * as bcrypt from 'bcrypt';
import * as connections from '../../config/connection/connection';
import { Document, Schema } from 'mongoose';
import { NextFunction } from 'express';

/**
 * @export
 * @interface IUserModel
 * @extends {Document}
 */
export interface IUserModel extends Document {
    name: string;
    lastname: string;
    username: string;
    password: string;
    prefered_currency: string;
    currencies: string[];

    comparePassword: (password: string) => Promise<boolean>;
}


/**
 * @swagger
 * components:
 *  schemas:
 *    UserSchema:
 *      required:
 *        - lastname
 *        - name
 *        - username
 *        - password
 *        - prefered_currency
 *      properties:
 *        id:
 *          type: string
 *        name:
 *          type: string
 *        username:
 *          type: string
 *        password:
 *          type: string
 *        lastname:
 *          type: string
 *        prefered_currency:
 *          type: string
 *          enum: [ars, usd, eur]
 *    Users:
 *      type: array
 *      items:
 *        $ref: '#/components/schemas/UserSchema'
 */
const UserSchema: Schema = new Schema({
    name: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    username: {
        type: String,
        unique: true,
        trim: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    prefered_currency: {
        type: String,
        required: true,
        enum: ['ars', 'usd', 'eur']
    },
    currencies: {
        type: [String],
        required: false        
    } 
}, {
    collection: 'usermodel',
    versionKey: false
}).pre('save', async function (next: NextFunction): Promise<void> {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const user: any = this;

    if (!user.isModified('password')) {
        return next();
    }

    try {
        const salt: string = await bcrypt.genSalt(10);

        const hash: string = await bcrypt.hash(user.password, salt);

        user.password = hash;
        next();
    } catch (error) {
        return next(error);
    }
});

/**
 * Method for comparing passwords
 */
UserSchema.methods.comparePassword = async function (candidatePassword: string): Promise<boolean> {
    try {
        const match: boolean = await bcrypt.compare(candidatePassword, this.password);

        return match;
    } catch (error) {
        return error;
    }
};


export default connections.db.model<IUserModel>('UserModel', UserSchema);