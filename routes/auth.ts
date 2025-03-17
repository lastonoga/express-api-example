import { prisma, role } from '@/config/database.js';
import { protectedRouteFactory, unprotectedRouteFactory } from '@/config/routes.js';
import { z } from 'zod';

export const registerUser = unprotectedRouteFactory.build({
    method: 'post',
    output: z.object({
        id: z.string(),
    }),
    handler: async ({ input: { name }, options, logger }) => {
        
        const user = await prisma.user.create({
            data: {
              name: 'John Doe',
              email: 'john.doe3@example.com',
              password: '<hashed-password-here>', // Ensure password is hashed securely
              role: role.user, // or Role.admin
            },
          });
        

        logger.debug('Result:', user); // middlewares provide options

        return user
    }
});

export const loginUser = unprotectedRouteFactory.build({
    method: 'post',
    output: z.object({
        greetings: z.string()
    }),
    handler: async ({ input: { name }, options, logger }) => {
        logger.debug('Options:', options); // middlewares provide options
        return { greetings: `Hello, ${name || 'World'}. Happy coding!` };
    }
});

export const profileUser = protectedRouteFactory.build({
    method: 'get',
    output: z.object({
        greetings: z.string()
    }),
    handler: async ({ input: { name }, options, logger }) => {
        logger.debug('Options:', options); // middlewares provide options
        return { greetings: `Hello, ${name || 'World'}. Happy coding!` };
    }
});