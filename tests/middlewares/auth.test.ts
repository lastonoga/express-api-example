import { Middleware, testMiddleware } from "express-zod-api";
import { authMiddleware, roleBasedMiddleware, verifyJwt, generateJwt } from '@/config/auth.js'
import { Role } from "@prisma/client";

describe('Auth Middlewares', () => {
    const mockUserId = '123e4567-e89b-12d3-a456-000000000001';

    const mockUser = {
        name: 'John Doe',
        email: 'john@example.com',
        password: 'hashedpassword',
        role: 'user'
    };

    beforeEach(() => {
        jest.clearAllMocks(); // Reset mocks before each test
    });

    it('should pass auth middleware', async () => {
        const token = await generateJwt(mockUser as any);

        const { output }: any = await testMiddleware({
            middleware: authMiddleware,
            requestProps: { method: "POST", headers: { authorization: `bearer ${token}` } },
        });
    
        expect(output.user.email).toEqual(mockUser.email)
    });

    it('should throw a 401 error for invalid token', async () => {
        const token = 'non-valid-token';
        await expect(testMiddleware({
            middleware: authMiddleware,
            requestProps: { method: "POST", headers: { authorization: `bearer ${token}` } },
        })).rejects.toThrow(
            expect.objectContaining({ message: 'Invalid token.', statusCode: 401 })
        );
    });

    
    it('should pass role based access', async () => {
        const token = await generateJwt(mockUser as any);
        const { output }: any = await testMiddleware({
            middleware: roleBasedMiddleware(mockUser.role as Role),
            requestProps: { method: "POST", headers: { authorization: `bearer ${token}` } },
            options: {
                user: mockUser,
            }
        });

        expect(output.user.email).toEqual(mockUser.email)
    });

    it('should not pass role based access', async () => {
        const token = await generateJwt(mockUser as any);
        await expect(testMiddleware({
            middleware: roleBasedMiddleware('admin'),
            requestProps: { method: "POST", headers: { authorization: `bearer ${token}` } },
            options: {
                user: mockUser,
            }
        })).rejects.toThrow(
            expect.objectContaining({ message: 'Access denied', statusCode: 403 })
        );
    });
});