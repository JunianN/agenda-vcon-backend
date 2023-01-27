import bcrypt from 'bcrypt';
import generateAccessToken from '../helpers/auth/generateAccessToken.js';
import { successResponseBuilder } from '../helpers/responseBuilder.js';
import Admin from '../models/adminModel.js';

export const signup = async (req, res, next) => {
    try {
        const { username, password } = req.body;

        const encryptedPassword = await bcrypt.hash(password, 10);

        const admin = await Admin.create({
            username,
            password: encryptedPassword,
        });

        const token = generateAccessToken({
            id: admin._id,
            username,
            isAdmin: true,
        });

        res
            .status(201)
            .json(successResponseBuilder({admin: admin, accessToken: token }));
    } catch (err) {
        if (err?.code === 11000) {
            next({
                message: `Admin lain dengan username ${err?.keyValue?.username} telah terdaftar.`,
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

export const signin = async (req, res, next) => {
    try {
        const { username, password} = req.body;

        if (!username || !password) {
            next({
                message: 'username dan/atau password tidak boleh kosong',
                statusCode: 400,
            });
            return;
        }

        const admin = await Admin.findOne({ username });

        if (!admin || !(await bcrypt.compare(password, admin.password))) {
            next({
                message: 'username dan/atau password salah',
                statusCode: 401,
            });
            return;
        }

        const token = generateAccessToken({
            id: admin._id,
            isAdmin: admin.role === 'ADMIN',
        });

        res
            .status(200)
            .json(successResponseBuilder({admin: admin, accessToken: token }));
    } catch (err) {
        next(err);
    }
};