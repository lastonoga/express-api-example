import { defaultEndpointsFactory } from 'express-zod-api';

export const adminRouteFactory = defaultEndpointsFactory.addMiddleware({
    handler: async ({ options: { user } }) => ({ user }) // user from authMiddleware
});

export const apiRouteFactory = defaultEndpointsFactory.addMiddleware({
    handler: async ({ options: { user } }) => ({ user }) // user from authMiddleware
});

export const protectedRouteFactory = defaultEndpointsFactory.addMiddleware({
    handler: async ({ options: { user } }) => ({ user }) // user from authMiddleware
});


export const unprotectedRouteFactory = defaultEndpointsFactory.addMiddleware({
    handler: async ({ options: { user } }) => ({ user }) // user from authMiddleware
});
