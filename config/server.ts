import { createConfig } from 'express-zod-api';
// @ts-expect-error Bug
import ui from 'swagger-ui-express';
import { getSwaggerDocumentation } from './swagger.js';
import { limiter } from './rate-limiter.js';
import { API_PORT, NODE_ENV, API_URL } from '@/config/env.js';

export const config = createConfig({
    http: {
        listen: API_PORT
    },
    cors: true,
    compression: true,
    startupLogo: NODE_ENV !== 'production',
    gracefulShutdown: {
        timeout: 1000,
        events: ['SIGINT', 'SIGTERM']
    },
    beforeRouting: ({ app, getLogger }) => {
        const logger = getLogger();

        logger.info(`Serving the API documentation at ${API_URL}/docs`);

        app.use('/docs', ui.serve, ui.setup(getSwaggerDocumentation()));

        app.use(limiter);
    }
});
