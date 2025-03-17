import { prisma, User } from '@/config/database.js';
import bcrypt from 'bcrypt';
import createHttpError from 'http-errors';
import { generateJwt } from '@/config/auth.js';
import { createService } from '@/app/utils/services.js';
import { Role } from '@/config/database.js';

type userData = {
    name: string;
    email: string;
    password: string;
    role: Role;
};

export const registerUserService = createService(async (data: unknown) => {
    const { name, email, password, role } = data as userData;

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    return await prisma.user.create({
        data: {
            name,
            email,
            password: hashedPassword,
            role
        }
    });
});

export const findUserByEmailService = createService(async (email: string) => {
    return await prisma.user.findUnique({
        where: { email }
    });
});

export const getUserObjectService = createService(async (user: User) => {
    return await prisma.user.findUnique({
        where: { id: user.id }
    });
});

export const loginUserService = createService(
    async (user: User, password: string) => {
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            throw createHttpError(401, 'Invalid email or password.');
        }

        return await generateJwt(user);
    }
);

/**
 * List all users
 */
export const listUsersService = createService(async () => {
    return prisma.user.findMany();
});

/**
 * Get a user by ID
 */
export const getUserByIdService = createService(async (userId: unknown) => {
    return prisma.user.findUnique({
        where: { id: userId as string }
    });
});

/**
 * Update a user by ID
 */
export const updateUserService = createService(
    async (userId: unknown, data: Partial<{ name?: string; role?: Role }>) => {
        return prisma.user.update({
            where: { id: userId as string },
            data
        });
    }
);

/**
 * Delete a user by ID
 */
export const deleteUserService = createService(async (userId: unknown) => {
    return prisma.user.delete({
        where: { id: userId as string }
    });
});
