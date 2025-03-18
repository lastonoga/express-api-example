import { registerUserService, findUserByEmailService, getUserObjectService, loginUserService, listUsersService, getUserByIdService, updateUserService, deleteUserService } from '@/app/services/users.js';
import bcrypt from 'bcrypt';
import { verifyJwt } from '@/config/auth.js';

jest.mock('@/config/database.js', () => {
    const createPrismaMock = jest.requireActual('prisma-mock');
    return {
        prisma: createPrismaMock.default(),
    };
});

describe('User Service', () => {
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

    it('should register a new user', async () => {
        // mockPrisma.user.create.mockResolvedValue(mockUser);

        const newUser = await registerUserService(mockUser);

        // User meta data is equal
        expect(newUser.name).toEqual(mockUser.name);
        expect(newUser.email).toEqual(mockUser.email);
        expect(newUser.role).toEqual(mockUser.role);

        // Password hashed and the same
        expect(bcrypt.compare(mockUser.password, newUser.password)).toBeTruthy();
    });

    it('should find a user by email', async () => {
        const user = await findUserByEmailService(mockUser.email);
        expect(user.email).toEqual(mockUser.email);
    });

    it('should get a user object by ID', async () => {
        const user = await getUserObjectService({
            id: mockUserId
        });
        expect(user.id).toEqual(mockUserId);
    });

    it('should log in a user with valid credentials', async () => {
        const token = await loginUserService({
            ...mockUser,
            password: await bcrypt.hash(mockUser.password, 10)
        }, mockUser.password);
        
        const tokenData = await verifyJwt(token)
        expect(tokenData.user.email).toEqual(mockUser.email);
    });

    it('should throw an error for incorrect password', async () => {
        const response = await loginUserService(mockUser, 'wrongpassword');
        expect(response).toBeUndefined();
    });

    it('should update a user', async () => {
        const updatedUser = { ...mockUser, name: 'John Updated' };
        const result = await updateUserService(mockUserId, { name: 'John Updated' });
        expect(result.name).toEqual(updatedUser.name);
    });

    it('should delete a user', async () => {
        const result = await deleteUserService(mockUserId);
        expect(result.id).toEqual(mockUserId);
    });
});