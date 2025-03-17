import { DependsOnMethod, Routing } from 'express-zod-api';
import { loginUser, profileUser, registerUser } from './auth.js';
import { deleteUser, getUser, listUsers, updateUser } from './users.js';
import { getData } from './data.js';

export const routing: Routing = {
    auth: {
        register: registerUser,
        login: loginUser,
        profile: profileUser,
    },
    users: listUsers.nest({
        ':id': new DependsOnMethod({
            get: getUser,
            delete: deleteUser,
            patch: updateUser,
        }),
    }),
    data: getData,
};
