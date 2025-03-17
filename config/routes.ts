import { defaultEndpointsFactory } from 'express-zod-api';
import { authMiddleware, roleBasedMiddleware } from './auth.js';
import { Role } from '@/config/database.js';

export const adminRouteFactory = defaultEndpointsFactory
    .addMiddleware(authMiddleware)
    .addMiddleware(roleBasedMiddleware(Role.admin));

export const protectedRouteFactory =
    defaultEndpointsFactory.addMiddleware(authMiddleware);

export const unprotectedRouteFactory = defaultEndpointsFactory;
