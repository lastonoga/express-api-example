import { z } from 'zod';
import { Role } from '@/config/database.js';

export const UserIdInputDto = z.object({
    id: z.string()
});

export const UserUpdateInputDto = z.object({
    id: z.string(),
    name: z.string().example('John').optional(),
    role: z.enum([Role.admin, Role.user]).optional()
});

export const UserOutputDto = z.object({
    id: z.string().example('123'),
    name: z.string().example('John'),
    email: z.string().example('john.test@test.com'),
    role: z.enum([Role.admin, Role.user])
});

export const UsersOutputDto = z.object({
    users: z.array(UserOutputDto)
});
