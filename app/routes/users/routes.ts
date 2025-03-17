import { adminRouteFactory } from '@/config/routes.js';
import {
    UserIdInputDto,
    UserUpdateInputDto,
    UserOutputDto,
    UsersOutputDto
} from './dto.js';
import {
    listUsersService,
    getUserByIdService,
    updateUserService,
    deleteUserService
} from '@/app/services/users.js';
import { DependsOnMethod } from 'express-zod-api';

export const listUsers = adminRouteFactory.build({
    tag: 'users',
    method: 'get',
    output: UsersOutputDto,
    handler: async () => {
        return {
            users: await listUsersService()
        };
    }
});

export const getUser = adminRouteFactory.build({
    tag: 'users',
    method: 'get',
    input: UserIdInputDto,
    output: UserOutputDto,
    handler: async ({ input: { id } }) => {
        return await getUserByIdService(id);
    }
});

export const updateUser = adminRouteFactory.build({
    tag: 'users',
    method: 'patch',
    input: UserUpdateInputDto,
    output: UserOutputDto,
    handler: async ({ input: { id, ...data } }) => {
        return await updateUserService(id, data);
    }
});

export const deleteUser = adminRouteFactory.build({
    tag: 'users',
    method: 'delete',
    input: UserIdInputDto,
    output: UserOutputDto,
    handler: async ({ input: { id } }) => {
        return await deleteUserService(id);
    }
});

export default listUsers.nest({
    ':id': new DependsOnMethod({
        get: getUser,
        delete: deleteUser,
        patch: updateUser
    })
});
