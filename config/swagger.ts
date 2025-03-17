import { Documentation } from 'express-zod-api';
import { config } from '@/config/server.js';
import { routing } from '@/app/routes/index.js';
import { API_URL } from './env.js';

export const getSwaggerDocumentation = () => {
    return new Documentation({
        routing,
        config,
        version: '1.0',
        title: 'Example API',
        serverUrl: API_URL,
        tags: {
            users: 'Everything about the users',
            files: 'Everything about the files processing',
            subscriptions: 'Everything about the subscriptions'
        }
    }).getSpec();
};
