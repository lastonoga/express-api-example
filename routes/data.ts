import { unprotectedRouteFactory } from '@/config/routes.js';
import { z } from 'zod';

export const getData = unprotectedRouteFactory.build({
    method: 'get',
    output: z.object({
        greetings: z.string()
    }),
    handler: async ({ input: { name }, options, logger }) => {
        logger.debug('Options:', options); // middlewares provide options
        return { greetings: `Hello, ${name || 'World'}. Happy coding!` };
    }
});