import {
    protectedRouteFactory,
    unprotectedRouteFactory
} from '@/config/routes.js';
import {
    registerUserService,
    findUserByEmailService,
    loginUserService,
    getUserObjectService
} from '@/app/services/users.js';
import {
    registerUserInputDto,
    registerUserOutputDto,
    loginUserInputDto,
    loginUserOutputDto,
    profileUserOutputDto
} from './dto.js';

export const registerUser = unprotectedRouteFactory.build({
    tag: 'authorization',
    method: 'post',
    input: registerUserInputDto,
    output: registerUserOutputDto,
    handler: async ({ input: { name, email, password, role } }) => {
        const user = await registerUserService({
            name,
            email,
            password,
            role
        });

        return user;
    }
});

export const loginUser = unprotectedRouteFactory.build({
    tag: 'authorization',
    method: 'post',
    input: loginUserInputDto,
    output: loginUserOutputDto,
    handler: async ({ input: { email, password } }) => {
        const user = await findUserByEmailService(email);
        const token = await loginUserService(user, password);
        return { token };
    }
});

export const profileUser = protectedRouteFactory.build({
    tag: 'authorization',
    method: 'get',
    output: profileUserOutputDto,
    handler: async ({ options: { user } }) => {
        return await getUserObjectService(user);
    }
});

export default {
    register: registerUser,
    login: loginUser,
    profile: profileUser
};
