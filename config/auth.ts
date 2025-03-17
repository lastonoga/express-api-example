import { JWT_SECRET_TOKEN, JWT_TOKEN_EXPIRE } from './env.js';
import jwt from 'jsonwebtoken';
import { User } from './database.js';
import { Middleware } from 'express-zod-api';
import createHttpError from 'http-errors';
import { Role } from './database.js';

type JwtError =
    | jwt.TokenExpiredError
    | jwt.NotBeforeError
    | jwt.JsonWebTokenError;

type JwtUser = {
    id: string;
    email: string;
    role: Role;
};

type MiddlewareOptions = {
    user: JwtUser;
};

export const generateJwt = async (user: User) => {
    return jwt.sign(
        {
            user
        },
        JWT_SECRET_TOKEN,
        { expiresIn: JWT_TOKEN_EXPIRE }
    );
};

export const verifyJwt = async (token: string): Promise<MiddlewareOptions> => {
    return (await jwt.verify(token, JWT_SECRET_TOKEN)) as MiddlewareOptions;
};

export const authMiddleware = new Middleware({
    security: {
        and: [{ type: 'header', name: 'authorization' }]
    },
    handler: async ({ request }) => {
        if (!request.headers.authorization) {
            throw createHttpError(401, 'Invalid token');
        }

        const token = request.headers.authorization.replace(/^Bearer\s+/i, '');
        let tokenData;

        try {
            tokenData = await verifyJwt(token);
        } catch (error) {
            const err = error as JwtError;

            switch (err.name) {
                case 'TokenExpiredError':
                    throw createHttpError(401, 'Token has expired.');
                case 'NotBeforeError':
                    throw createHttpError(401, 'Token is not active yet.');
                case 'JsonWebTokenError':
                    throw createHttpError(401, 'Invalid token.');
                default:
                    throw createHttpError(500, 'Internal server error.');
            }
        }

        return {
            user: tokenData.user
        };
    }
});

export const roleBasedMiddleware = (role: Role) =>
    new Middleware({
        handler: async ({ options }) => {
            const { user } = options as MiddlewareOptions;

            if (user.role !== role) {
                throw createHttpError(403, 'Access denied');
            }

            return {
                user
            };
        }
    });
