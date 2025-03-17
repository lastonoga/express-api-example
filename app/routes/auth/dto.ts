import { z } from 'zod';
import { Role } from '@/config/database.js';

export const registerUserInputDto = z.object({
    name: z.string().example('John'),
    email: z.string().example('john.test@test.com'),
    password: z.string().example('abc'),
    role: z.enum([Role.admin, Role.user])
});

export const registerUserOutputDto = z.object({
    id: z.string()
});

export const loginUserInputDto = z.object({
    email: z.string().example('john.test@test.com'),
    password: z.string().example('abc')
});

export const loginUserOutputDto = z.object({
    token: z.string()
});

export const profileUserOutputDto = z.object({
    id: z.string().example('123'),
    name: z.string().example('John'),
    email: z.string().example('john.test@test.com'),
    role: z.enum([Role.admin, Role.user])
});
