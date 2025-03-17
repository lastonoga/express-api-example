import { Routing } from 'express-zod-api';
import auth from './auth/routes.js';
import users from './users/routes.js';
import data from './data/routes.js';

export const routing: Routing = {
    auth,
    users,
    data
};
