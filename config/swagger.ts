import { Documentation } from 'express-zod-api';
import { config } from '@/config/server.js';
import { routing } from '@/routes/index.js';

export const getSwaggerDocumentation = () => {
    return new Documentation({
        routing,
        config,
        version: '1.0',
        title: 'Example API',
        serverUrl: 'http://localhost:8090',
        tags: {
            users: 'Everything about the users',
            files: 'Everything about the files processing',
            subscriptions: 'Everything about the subscriptions'
        }
    }).getSpec();
};
