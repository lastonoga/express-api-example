import { adminRouteFactory } from '@/config/routes.js';
import { z } from 'zod';

export const listUsers = adminRouteFactory.build({
    method: 'get',
    output: z.object({
        greetings: z.string()
    }),
    handler: async ({ input: { name }, options, logger }) => {
        logger.debug('Options:', options); // middlewares provide options
        return { greetings: `Hello, ${name || 'World'}. Happy coding!` };
    }
});

export const getUser = adminRouteFactory.build({
    method: 'get',
    output: z.object({
        greetings: z.string()
    }),
    handler: async ({ input: { name }, options, logger }) => {
        logger.debug('Options:', options); // middlewares provide options
        return { greetings: `Hello, ${name || 'World'}. Happy coding!` };
    }
});

export const updateUser = adminRouteFactory.build({
    method: 'patch',
    output: z.object({
        greetings: z.string()
    }),
    handler: async ({ input: { name }, options, logger }) => {
        logger.debug('Options:', options); // middlewares provide options
        return { greetings: `Hello, ${name || 'World'}. Happy coding!` };
    }
});

export const deleteUser = adminRouteFactory.build({
    method: 'delete',
    output: z.object({
        greetings: z.string()
    }),
    handler: async ({ input: { name }, options, logger }) => {
        logger.debug('Options:', options); // middlewares provide options
        return { greetings: `Hello, ${name || 'World'}. Happy coding!` };
    }
});