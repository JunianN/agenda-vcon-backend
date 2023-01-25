import bcrypt from 'bcrypt';
import generateAccessToken from '../helpers/auth/generateAccessToken.js';
import { successResponseBuilder } from '../helpers/responseBuilder.js';
import Admin from '../models/adminModel.js';

export const signupAdmin = async (req, res, next) => {
    try {
        const { name, password } = req.body;

        const encryptedPassword = await bcrypt.hash(password, 10);

        const admin = await Admin.create({
            name,
            password: encryptedPassword,
        });

        const token = generateAccessToken({
            id: admin._id,
            isAdmin: true,
        });

        res
            .status(201)
            .json(successResponseBuilder({admin: admin, accessToken: token }));
    } catch (err) {
        if (err?.code === 11000) {
            next({
                message: `Admin lain dengan nama ${err?.keyValue?.name} telah terdaftar.`,
                stack: err.stack,
                statusCode: 409,
            });
            return;
        }
        if (['CastError', 'ValidationError'].includes(err?.name)) {
            next({
                message: err.message,
                stack: err.stack,
                statusCode: 400,
            });
            return;
        }
        next(err);
    }
};
    