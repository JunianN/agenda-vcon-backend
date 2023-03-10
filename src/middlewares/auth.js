import jwt from "jsonwebtoken";
import getenv from "../helpers/getenv.js";
import { httpForbidden, httpUnauthorized } from "../helpers/httpExceptionBuilder.js";
import { errorResponseBuilder } from "../helpers/responseBuilder.js";

const TOKEN_SECRET = getenv('TOKEN_SECRET');

export const authenticate = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token)
        return res.status(401).json(errorResponseBuilder(httpUnauthorized()));

    jwt.verify(token, TOKEN_SECRET, (err, admin) => {
        if (err)
            return res.status(401).json(errorResponseBuilder(httpUnauthorized()));

        req.admin = admin;
        next();
    });
};