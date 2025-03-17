/* eslint-disable @typescript-eslint/no-explicit-any */

import { Prisma } from '@prisma/client';
import createHttpError from 'http-errors';

export const createService = (fn: (...args: any) => any) => {
    return async (...args: any) => {
        let result;

        try {
            result = await fn(...args);
        } catch (error: any) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                switch (error.code) {
                    case 'P2002': // Unique constraint failed
                        throw createHttpError(
                            409,
                            'Duplicate entry: Unique constraint failed.'
                        );
                    case 'P2025': // Record not found
                        throw createHttpError(404, 'Record not found.');
                    default:
                        throw createHttpError(
                            400,
                            `Prisma error: ${error.message}`
                        );
                }
            }

            if (error instanceof Prisma.PrismaClientValidationError) {
                throw createHttpError(
                    400,
                    `Validation error: ${error.message}`
                );
            }

            if (error instanceof Prisma.PrismaClientInitializationError) {
                throw createHttpError(500, 'Database initialization failed.');
            }

            if (error instanceof Prisma.PrismaClientRustPanicError) {
                throw createHttpError(500, 'Prisma encountered a panic.');
            }
        }

        return result;
    };
};
